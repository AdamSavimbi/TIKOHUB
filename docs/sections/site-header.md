# Site header

Top of every page: the TikoPoa wordmark in the top-left corner, kept there while the page scrolls. The header pill joins it in ticket #6.

- **Design spec:** `design/00-global-header-pill/` (pill not built yet; the wordmark follows the owner's requests, not the mock-up)
- **Status:** approved 2026-11-12

## Files

- `src/components/site-header.tsx`: the header (server component).
- `src/lib/mock/site-header.ts`: brand name and link, plus the `SiteHeaderContent` type.
- `src/app/layout.tsx`: renders it once for every page and loads the wordmark font.
- `src/app/globals.css`: the `font-wordmark` token.

## What it does

- **Wordmark:** "TikoPoa" in Archivo, wide heavy italic, 24px on desktop and 20px on phones. Links to the home page.
- **Position:** 20px from the left edge on desktop, 16px on phones, outside the section gutter.
- **Sticky:** a white bar (64px desktop, 56px phone) stays at the top while the page scrolls.

## Data

- The component takes `content: SiteHeaderContent` as a prop. Today it receives `siteHeaderContent` from the mock file.

## Accessibility

- The wordmark is a real link with a 44px touch target. Ink on white.

## Decisions

- **Small Posh-style wordmark, not the large one in the page-flow mock-up:** owner decision.
- **Archivo for the wordmark only:** owner asked for the look of the Posh logo; Archivo is the closest free typeface. Everything else stays Inter.
- **Corner position:** owner prefers white space in the middle to a gap on the left.
- **Solid white bar:** keeps the wordmark readable over photos and cards that scroll under it.
- **Shown on phones too:** issue #4 planned a "T" circle on phones; the owner asked for the wordmark first. Revisit in #6.

## History

- 2026-11-12: Wordmark added, moved to the corner, restyled and made sticky ([changelog](../CHANGELOG.md#2026-11-12-groundwork-for-the-landing-page)).
