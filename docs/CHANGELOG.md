# Changelog

Approved changes only, newest first. Format: [`_templates/changelog-entry.md`](_templates/changelog-entry.md).

## 2026-11-09: Live pulse section and design preview

First real homepage section, plus tooling to compare builds with the design. See [Live pulse](sections/pulse.md), [Design preview](foundation/design-preview.md), [Theme](foundation/theme.md).

- **Live pulse section:** next on-sale countdown and a looping sample chat, matching the design at 390px and scaled for desktop. Sample data in `src/lib/mock/pulse.ts`.
- **Owner exceptions:** no Pause button, and the section animates even with reduce-motion on (`data-motion="always"`).
- **Animations as theme tokens:** CSS modules don't load under the current Turbopack config.
- **Design preview:** `design/draft_1/support.js` renders every artboard live in a browser.
- **Brand name TikoPoa:** placeholder hero headline, page title and chat header.
- **Project rules:** `CLAUDE.md` holds the theme, accessibility, mock-data, docs and screenshot-check rules; `docs/` added.

## 2026-11-09: Theme and fonts

Global theme from the design, on shadcn with Base UI. See [Theme and fonts](foundation/theme.md). [PR #1](https://github.com/AdamSavimbi/TIKOHUB/pull/1).

- **Palette as shadcn tokens:** design colours in oklch, plus custom `pill`, `ink` and `success`.
- **Shape and type:** pill buttons, 22/28px cards and panels, Inter, `headline` and `eyebrow` utilities.
- **Accessible Button:** 44px minimum, ink focus outline, hovers that keep 4.5:1 contrast.
