/*
 * support.js: minimal runtime for the *.dc.html design artboards.
 *
 * Lets each artboard open directly in a browser (file:// or any static server)
 * so it can be compared side by side with the built React section.
 * Design preview only: never imported by the app.
 *
 * Supports the subset of the format these files use:
 *   <x-dc>            root; its children are the template
 *   <helmet>          moved into <head> (fonts, styles)
 *   {{ path }}        text and attribute bindings (a.b.c paths, true/false/null/numbers)
 *   <sc-if value>     render children when the value is truthy
 *   <sc-for list as>  repeat children for each item (keyed by item.id when present)
 *   onClick="{{ fn }}" and other on* attributes: event handlers
 *   ref="{{ fn }}"    called with the live element after each render
 *   <script type="text/x-dc" data-dc-script data-props='{...}'>
 *     class Component extends DCLogic { renderVals() {...} }
 *     with this.state, this.props, this.setState(), componentDidMount(), componentWillUnmount()
 *
 * Re-renders patch the existing DOM in place, so CSS animations, focus and
 * typed input survive state changes.
 */
(function () {
  "use strict";

  var BINDING = /\{\{\s*([^}]+?)\s*\}\}/g;
  var SINGLE_BINDING = /^\{\{\s*([^}]+?)\s*\}\}$/;

  function DCLogic(props) {
    this.props = props || {};
    this.state = {};
  }
  DCLogic.prototype.setState = function (patch) {
    var next = typeof patch === "function" ? patch(this.state, this.props) : patch;
    this.state = Object.assign({}, this.state, next);
    if (this.__schedule) this.__schedule();
  };
  window.DCLogic = DCLogic;

  /* ---------- expressions ---------- */

  function evaluate(expr, scope) {
    expr = expr.trim();
    if (expr === "true") return true;
    if (expr === "false") return false;
    if (expr === "null") return null;
    if (expr === "undefined") return undefined;
    if (/^-?\d+(\.\d+)?$/.test(expr)) return Number(expr);
    var quoted = expr.match(/^(['"])(.*)\1$/);
    if (quoted) return quoted[2];
    var value = scope;
    var parts = expr.split(".");
    for (var i = 0; i < parts.length; i++) {
      if (value == null) return undefined;
      value = value[parts[i]];
    }
    return value;
  }

  function interpolate(text, scope) {
    return text.replace(BINDING, function (_, expr) {
      var v = evaluate(expr, scope);
      return v == null ? "" : String(v);
    });
  }

  /* ---------- build: template -> fresh DOM nodes ---------- */

  function build(tplNode, scope, key) {
    if (tplNode.nodeType === Node.TEXT_NODE) {
      var t = document.createTextNode(interpolate(tplNode.data, scope));
      t.__src = tplNode;
      return [t];
    }
    if (tplNode.nodeType !== Node.ELEMENT_NODE) return [];

    var tag = tplNode.localName;

    if (tag === "sc-if") {
      var cond = evaluate(stripBraces(tplNode.getAttribute("value")), scope);
      return cond ? buildChildren(tplNode, scope, key) : [];
    }

    if (tag === "sc-for") {
      var list = evaluate(stripBraces(tplNode.getAttribute("list")), scope) || [];
      var as = tplNode.getAttribute("as") || "item";
      var out = [];
      list.forEach(function (item, index) {
        var child = Object.create(scope);
        child[as] = item;
        var itemKey = item && item.id != null ? item.id : index;
        out.push.apply(out, buildChildren(tplNode, child, itemKey));
      });
      return out;
    }

    var el = document.createElementNS(tplNode.namespaceURI, tplNode.localName);
    el.__src = tplNode;
    el.__key = key;
    el.__h = {};

    for (var i = 0; i < tplNode.attributes.length; i++) {
      var attr = tplNode.attributes[i];
      var name = attr.name;
      var single = attr.value.match(SINGLE_BINDING);

      if (name === "ref" && single) {
        el.__ref = evaluate(single[1], scope);
        continue;
      }
      if (/^on[a-z]+$/i.test(name)) {
        var handler = single ? evaluate(single[1], scope) : null;
        if (typeof handler === "function") el.__h[name.slice(2).toLowerCase()] = handler;
        continue;
      }
      if (single) {
        var v = evaluate(single[1], scope);
        // Drop non-ARIA attributes bound to false/null/undefined (e.g. disabled).
        if ((v === false || v == null) && name.indexOf("aria-") !== 0) continue;
        el.setAttribute(name, String(v));
      } else {
        el.setAttribute(name, interpolate(attr.value, scope));
      }
    }

    bindHandlers(el);
    buildChildren(tplNode, scope, undefined).forEach(function (c) {
      el.appendChild(c);
    });
    return [el];
  }

  function buildChildren(tplNode, scope, key) {
    var out = [];
    var kids = tplNode.childNodes;
    for (var i = 0; i < kids.length; i++) {
      var built = build(kids[i], scope, key);
      for (var j = 0; j < built.length; j++) {
        if (key !== undefined && built[j].__key === undefined) built[j].__key = key;
        out.push(built[j]);
      }
    }
    return out;
  }

  function stripBraces(value) {
    var m = (value || "").match(SINGLE_BINDING);
    return m ? m[1] : value || "";
  }

  function bindHandlers(el) {
    el.__bound = el.__bound || {};
    Object.keys(el.__h).forEach(function (type) {
      if (el.__bound[type]) return;
      el.__bound[type] = true;
      el.addEventListener(type, function (event) {
        var fn = el.__h && el.__h[type];
        if (fn) fn(event);
      });
    });
  }

  /* ---------- patch: update live DOM in place ---------- */

  function sameNode(a, b) {
    return (
      a.nodeType === b.nodeType &&
      a.nodeName === b.nodeName &&
      a.__src === b.__src &&
      a.__key === b.__key
    );
  }

  function patchChildren(parent, next, refs) {
    var old = Array.prototype.slice.call(parent.childNodes);
    next.forEach(function (n, i) {
      var o = old[i];
      if (!o) {
        parent.appendChild(n);
        collectRefs(n, refs);
        return;
      }
      if (!sameNode(o, n)) {
        parent.replaceChild(n, o);
        collectRefs(n, refs);
        return;
      }
      if (n.nodeType === Node.TEXT_NODE) {
        if (o.data !== n.data) o.data = n.data;
        return;
      }
      var a, k;
      for (k = o.attributes.length - 1; k >= 0; k--) {
        a = o.attributes[k];
        if (!n.hasAttribute(a.name)) o.removeAttribute(a.name);
      }
      for (k = 0; k < n.attributes.length; k++) {
        a = n.attributes[k];
        if (o.getAttribute(a.name) !== a.value) o.setAttribute(a.name, a.value);
      }
      o.__h = n.__h;
      bindHandlers(o);
      if (n.__ref) refs.push([n.__ref, o]);
      patchChildren(o, Array.prototype.slice.call(n.childNodes), refs);
    });
    for (var r = next.length; r < old.length; r++) old[r].remove();
  }

  function collectRefs(node, refs) {
    if (node.nodeType !== Node.ELEMENT_NODE) return;
    if (node.__ref) refs.push([node.__ref, node]);
    var kids = node.children;
    for (var i = 0; i < kids.length; i++) collectRefs(kids[i], refs);
  }

  /* ---------- mount ---------- */

  function mount() {
    var host = document.querySelector("x-dc");
    if (!host) return;

    var helmet = host.querySelector("helmet");
    if (helmet) {
      while (helmet.firstChild) document.head.appendChild(helmet.firstChild);
      helmet.remove();
    }

    var template = document.createElement("template");
    template.innerHTML = host.innerHTML;
    host.innerHTML = "";

    var scriptEl = document.querySelector("script[data-dc-script]");
    var props = {};
    var Component = DCLogic;
    if (scriptEl) {
      try {
        props = JSON.parse(scriptEl.getAttribute("data-props") || "{}");
      } catch {
        props = {};
      }
      Component = new Function("DCLogic", scriptEl.textContent + "\nreturn Component;")(DCLogic);
    }

    var instance = new Component(props);
    instance.props = instance.props || props;
    instance.state = instance.state || {};

    var queued = false;
    function render() {
      queued = false;
      var vals = typeof instance.renderVals === "function" ? instance.renderVals() || {} : {};
      var next = buildChildren(template.content, vals, undefined);
      var refs = [];
      patchChildren(host, next, refs);
      refs.forEach(function (pair) {
        if (typeof pair[0] === "function") pair[0](pair[1]);
      });
    }
    instance.__schedule = function () {
      if (queued) return;
      queued = true;
      queueMicrotask(render);
    };

    render();
    if (typeof instance.componentDidMount === "function") instance.componentDidMount();
    window.addEventListener("pagehide", function () {
      if (typeof instance.componentWillUnmount === "function") instance.componentWillUnmount();
    });
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", mount);
  } else {
    mount();
  }
})();
