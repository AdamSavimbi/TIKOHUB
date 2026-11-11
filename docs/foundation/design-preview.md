# Design preview

Lets the design artboards in `design/<section>/design/*.dc.html` open live in a browser, so each built section can be compared side by side with its design.

- **Status:** approved 2026-11-09

## Files

- `design/support.js`: small runtime each artboard already loads (`<script src="./support.js">`), reached through a `support.js` symlink in each `design/<section>/design/`.

## What it does

- Renders the artboard's custom format: `{{ }}` bindings, `<sc-if>`, `<sc-for>`, click and hover handlers, refs, and the component's state and timers.
- Updates the page in place, so animations, focus and typed text survive re-renders.
- Open any artboard with `file://` in a browser; no server needed.

## Decisions

- **Design preview only:** never imported by the app.
- **Placed next to the artboards:** they reference `./support.js`, so the files work without edits.

## History

- 2026-11-09: Added; all 9 artboards render with no errors ([changelog](../CHANGELOG.md#2026-11-09-live-pulse-section-and-design-preview)).
