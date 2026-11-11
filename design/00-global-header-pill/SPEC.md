# 00 Global header (pill nav)

Rendered once, at the top of every page, above the first section. Not part of the hero.

- Design file: `design/Main.dc.html` (mobile, look at the block marked `<!-- pill bar -->` and the menu panel) and `design/Desktop.dc.html` (desktop). The hero in those files currently contains this pill; move it into a shared header component and leave it out of the hero.
- Inspiration: `inspiration/partiful-pill-bar.png`, `inspiration/partiful-dropdown-open.jpg`, `inspiration/flow-crop-header.png` (how it sits: big "TikoPoa" wordmark left, pill beside it; the mock-up uses Partiful's own pill as a stand-in).

## What it does
- Grey pill (#efefec), fully rounded. Logo circle left, links centred (Explore, Organize, Help), search icon, white "Log in", black "Create event".
- Hover or focus on a link: a white highlight chip behind it.
- Open a link: a frosted panel drops under the pill with link columns and one feature card, and the page behind blurs. No page load. Close on mouse leave, overlay click or Escape.
- Mobile: a menu button opens the same panel as a list. Search icon expands the pill into a search field with the placeholder "Try Free events this weekend".
- Phones that cannot do backdrop blur get a plain translucent tint instead.

## Differences
- Light theme instead of Partiful's black (on purpose).
- Posh's own nav bar (shown in the hero screenshot) is NOT used; this pill replaces it.

## 21st.dev / shadcn
- Navbar with Animated Mega Dropdown: https://21st.dev/@aghasisahakyan1/components/navbar-with-animated-mega-dropdown
- Expandable Search Bar: https://21st.dev/@arunachalam/components/expandable-search-bar
- shadcn: navigation-menu, popover, button.
