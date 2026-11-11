# Theme and fonts

Global look of the site: quiet white, Posh style, from `design/README.md`. Applies to every page.

- **Status:** approved 2026-11-09 ([PR #1](https://github.com/AdamSavimbi/TIKOHUB/pull/1))

## Files

- `src/app/globals.css`: all colour, radius, type and shadow tokens.
- `src/app/layout.tsx`: loads Inter with `next/font`.
- `src/components/ui/button.tsx`: shadcn Button restyled to the theme.
- `components.json`: shadcn on Base UI (`base-nova`).

## Tokens

| Token | Value | Use |
|---|---|---|
| `background` / `foreground` | #ffffff / #0b0b0b | page, main text |
| `muted-foreground` | #6b6b66 | secondary text |
| `border`, `input` | #e4e4e0 | hairlines |
| `secondary`, `muted`, `accent` | #f2f2f0 | soft fills |
| `pill` | #efefec | pill bar, footer |
| `primary` | #a95443 | main buttons |
| `ink` | #0b0b0b | ink buttons |
| `success` | #1f6f4a | live indicator |
| `destructive` | #b4361b | low stock |
| `ring` | #0b0b0b | focus outline |

- **Shape:** `rounded-pill` 999px, `rounded-card` 22px, `rounded-panel` 28px. Only shadow: `shadow-float`.
- **Type:** Inter variable font. `headline` and `eyebrow` utilities; `tabular-nums` for numbers.
- **Animations:** `animate-live-ping`, `animate-bubble-in`, `animate-typing-in`, `animate-typing-dot`, defined as theme tokens.
- **Button:** variants `default`, `ink`, `secondary`, `outline`, `ghost`, `destructive`, `link`. Every size at least 44px.

## Accessibility

- All text pairs at least 4.5:1 (grey on white 5.36, white on terracotta 5.20).
- Ink focus outline always visible on keyboard focus.
- Global `prefers-reduced-motion` rule shortens animations and transitions. Anything inside `data-motion="always"` is skipped (owner-approved sections only).

## Decisions

- **Hover darkens instead of lightening:** shadcn's lighter hover drops white-on-terracotta to 4.30:1.
- **Light theme only:** the design has no dark mode; shadcn's dark palette was removed.
- **Inter variable font:** one file covers weights 400–800.
- **Animations live in `globals.css`, not CSS modules:** the Turbopack rule in `next.config.ts` loads every `.css` file as global CSS, so module class names don't exist.
- **Brand name is TikoPoa:** page title and app copy; the design files still say "BRAND".

## History

- 2026-11-09: Theme, tokens, Inter and Button set up ([changelog](../CHANGELOG.md#2026-11-09-theme-and-fonts)).
- 2026-11-09: Animation tokens, reduce-motion opt-out, TikoPoa title ([changelog](../CHANGELOG.md#2026-11-09-live-pulse-section-and-design-preview)).
