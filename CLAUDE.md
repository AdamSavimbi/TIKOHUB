@AGENTS.md

# TIKOHUB: ticketing platform

## Paths

- The app lives in `src/`. "app/page.tsx" means `src/app/page.tsx`, "components/..." means `src/components/...`, and "lib/..." means `src/lib/...`.
- Design specs live in `design/draft_1/`. Read `design/draft_1/README.md` first. Each `*.dc.html` is one artboard, 390px wide unless noted. They are a custom format, not React: rebuild them, don't copy them. Designer notes describing behaviour are in `design/draft_1/canvas.json` under `notes`.
- `design/draft_1/support.js` makes each artboard open live in a browser (`file://`), so it can be screenshotted next to the built section. Design preview only; never import it into the app.
- The brand name is "TikoPoa" (initial "T"). The design files still say "BRAND" and "B"; always use TikoPoa in the app.

## Theme and tokens

Quiet white, Posh style: minimal, lots of white space, one huge tight headline per section, no decorative gradients, no heavy shadows, no emoji. Mobile first.

- shadcn/ui on **Base UI** (`base-nova`). Keep it. Add missing components with the shadcn MCP or `npx shadcn@latest add <name>`.
- All tokens live in `src/app/globals.css`. Use Tailwind token classes, **never raw hex** in components. Don't change the theme or global files without saying why first.

| Token (Tailwind name) | Hex | Use |
|---|---|---|
| `background` | #ffffff | page |
| `foreground` | #0b0b0b | main text (ink) |
| `muted-foreground` | #6b6b66 | secondary text, captions |
| `border`, `input` | #e4e4e0 | 1px hairlines |
| `secondary`, `muted`, `accent` | #f2f2f0 | soft fills, secondary buttons |
| `pill` / `pill-foreground` | #efefec | pill bar, footer, grey chat bubbles |
| `primary` / `primary-foreground` | #a95443 / white | main calls to action ("View event") |
| `ink` / `ink-foreground` | #0b0b0b / white | ink buttons ("Create event", "Get tickets") |
| `success` / `success-foreground` | #1f6f4a / white | live indicator |
| `destructive` / `destructive-foreground` | #b4361b / white | low stock warning |
| `ring` | #0b0b0b | focus outline |

- Font: Inter via `next/font` (`font-sans`, `font-heading`).
- `headline` utility: weight 500, tracking -0.045em, line-height 0.95. Add a size with it, e.g. `headline text-[44px]`.
- `eyebrow` utility: 11px, weight 600, uppercase, tracking 0.14em, `muted-foreground`.
- `tabular-nums` for counts and countdowns.
- Radii: `rounded-pill` (999px) for buttons, `rounded-card` (22px), `rounded-panel` (28px). Note that shadcn's `rounded-lg` is 22px and `rounded-xl` is about 31px, so use arbitrary px values for small radii like 12px.
- Borders, not shadows. The only shadow is `shadow-float`, for floating panels like the menu dropdown.
- Animations are theme tokens in `globals.css` (`animate-live-ping`, `animate-bubble-in`, `animate-typing-in`, `animate-typing-dot`). Add new keyframes there the same way. CSS modules don't work here: the Turbopack rule in `next.config.ts` loads every `.css` file as global CSS, so `styles.x` is `undefined`.
- Buttons: `<Button>` variants `default` (terracotta), `ink`, `secondary`, `outline`, `ghost`, `destructive`, `link`. Sizes: `default` 44px, `lg` 52px, `icon` 44px.
- Section side padding matches the hero: `px-4` on mobile, `clamp(16px, 3.4vw, 48px)` on wider screens.

## Accessibility rules

- Touch targets at least 44px.
- Text contrast at least 4.5:1. Check hover and disabled states too.
- Keyboard focus always visible (ink outline, already global).
- Respect `prefers-reduced-motion` by default: no looping or sliding motion; show the final state instantly. The only opt-out is `data-motion="always"` on a section, used only where the owner has decided motion stays (currently: Live pulse).
- Looping or auto-moving content gets a visible Pause/Play button (44px), unless the owner has waived it for that section (currently: Live pulse).
- Real `<button>` and `<a>` elements only. No clickable divs.
- Decorative motion is hidden from screen readers. Give them one clear text summary instead.
- Clean up every timer, interval and observer on unmount.

## Data

- Text and sample data never go inside JSX. Put them in `src/lib/mock/<name>.ts`, typed, and pass them to the component as props, so real Supabase data can replace them later without layout changes.

## Documentation

- `docs/` holds concise records of approved changes. See `docs/README.md` for the layout and `docs/_templates/` for formats.
- Update docs **only after the owner approves the final version** of a change: update or add the topic doc (`docs/sections/`, `docs/foundation/`, ...) and add an entry to `docs/CHANGELOG.md`.
- Keep entries short: main changes first, one-line explanation each, decisions with reasons.

## Verification

When a section or page is done:

1. Run `npx tsc --noEmit` and `npm run lint`, and fix every error.
2. Start the dev server, screenshot the page at 390px wide, and compare it side by side with the matching `design/draft_1/*.dc.html` (open it in the browser; `support.js` renders it).
3. List every difference, including small ones (spacing, font size, colour), and fix them.
4. Report: files created or changed, shadcn components used, and anything uncertain.

## Agent skills

### Issue tracker

Issues live in GitHub Issues for `AdamSavimbi/TIKOHUB`, managed with the `gh` CLI. See `docs/agents/issue-tracker.md`.

### Triage labels

Default vocabulary: `needs-triage`, `needs-info`, `ready-for-agent`, `ready-for-human`, `wontfix`. See `docs/agents/triage-labels.md`.

### Domain docs

Single-context: `GLOSSARY.md` and `docs/adr/` at the repo root. See `docs/agents/domain.md`.
