# Site header

Top of every page, fixed while scrolling: the TikoPoa wordmark and the header pill with links, a dropdown, search and the main actions.

- **Design spec:** `design/00-global-header-pill/` (`Desktop.dc.html`, `Main.dc.html`, `SPEC.md`), inspired by the Partiful pill and dropdown
- **Status:** approved 2026-11-12 (ticket #6)

## Files

- `src/components/site-header.tsx`: the header (client component).
- `src/lib/mock/site-header.ts`: all text, links and routes, plus the `SiteHeaderContent` type.
- `src/app/layout.tsx`: renders it once for every page and loads the wordmark font.
- `src/app/globals.css`: the `font-wordmark` and `shadow-float` tokens.

## What it does

- **Desktop (1024px and up):** the wordmark in the top-left corner, then a grey pill (max 880px, centred) with Explore, Organize and Help, a search icon, a white "Log in" and a black "Create event".
- **Highlight chip:** hovering, focusing or opening a link puts a white chip behind it.
- **Dropdown:** each link opens a frosted panel 10px under the pill, the full width of the pill: two link columns and one feature card. The page behind blurs. Closes on mouse leave, a click outside or Escape. No page load.
- **Blur fallback:** without `backdrop-filter`, the page gets a plain white tint and the panel is solid pill grey.
- **Phones and tablets (below 1024px):** the wordmark inside the pill, a search icon, a black "Log in" and a menu button. The menu opens a list (Explore, Organize, My tickets, Help, Create event) and a "Selling fast" card.
- **Search:** the search icon turns the pill into a search field with the placeholder "Try “Free events this weekend”". It takes focus, closes on Escape or its close button (focus returns to the icon), and Enter goes to `/events?q=<query>`.
- **Routes:** every link points to its future route (`/events…`, `/create`, `/login`, `/help…`, `/organizers…`, `/tickets`) and 404s until that page exists.

## Data

- The component takes `content: SiteHeaderContent` as a prop. Today it receives `siteHeaderContent` from the mock file.
- Feature cards have an optional `image`; until event photos exist they show an arrow instead.

## Accessibility

- Built on Base UI's navigation menu (desktop) and popover (phone menu): keyboard opening, Escape, outside click and focus return come from them.
- Every control is at least 44px. The search field has no border, so the pill gets an ink outline while it has focus.
- Panel links underline on hover instead of turning terracotta, which would fall just under 4.5:1 on the grey panel.
- A tap on the phone menu focuses the list itself; the keyboard focuses the first link.

## Decisions

- **Small corner wordmark outside the pill on desktop:** owner decision from #5, kept here.
- **Wordmark inside the phone pill instead of a "T" circle:** owner decision.
- **Phone pill shows "Log in" (black), not "Create event":** owner wants it minimal and direct; "Create event" moves into the phone menu.
- **Phone layout up to 1024px:** at 768px the desktop pill was too cramped.
- **No "Refunds" link:** the refund policy is not confirmed yet.
- **No photo in the dropdown cards yet:** the design's gradients are against the theme, and event photos arrive with the hero (#7).
- **Base UI primitives used directly, not the shadcn wrappers:** the wrappers' styling would all have been overridden.
- **Known, left for later:** the gap between the pill's left edge and "Explore" on desktop (owner: keep for now).

## History

- 2026-11-12: Header pill added: links, dropdown, search, phone menu ([changelog](../CHANGELOG.md#2026-11-12-header-pill)).
- 2026-11-12: Wordmark added, moved to the corner, restyled and made sticky ([changelog](../CHANGELOG.md#2026-11-12-groundwork-for-the-landing-page)).
