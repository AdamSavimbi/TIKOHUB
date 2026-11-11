# TikoPoa landing page: design pack for Claude Code

START HERE. This folder is the landing page broken into sections, in the exact top-to-bottom order of the page. Each numbered folder holds one section: a SPEC.md, the design file, and the inspiration it came from.

The order was set by the owner in `00-page-flow/desired-page-flow.png` (a mock-up he assembled from the inspiration sites). It is the source of truth for ORDER and STRUCTURE.

## Page order (top to bottom)

| # | Folder | What it is | Inspiration |
|---|--------|------------|-------------|
| 00 | `00-global-header-pill/` | Header on every page: TikoPoa wordmark + pill nav | Partiful pill bar + dropdown |
| 01 | `01-live-pulse/` | "Happening right now": countdown + live chat | Partiful iMessage chat |
| 02 | `02-hero/` | "Find your world": giant headline + moving event lineup | Posh hero + Mookh lineup |
| 03 | `03-proof/` | Count-up stats | HustleSasa "Proof in the platform" (structure only) |
| 04 | `04-organizers/` | Organizer showcase | Posh "Driving culture & community" |
| 05 | `05-how-it-works/` | Three steps | none (built from brief) |
| 06 | `06-browse/` | Filter chips + event list | none |
| 07 | `07-faq/` | Accordion | none |
| 08 | `08-footer/` | Company info + links | none |

## How to read the files

- `*.dc.html` are design files in a custom format. They are NOT React. They are the visual and behaviour spec: copy layout, spacing, colours, copy and interactions, then rebuild as React components. Mobile boards are 390px wide; `Desktop.dc.html` is fluid.
- `inspiration/` holds the real sites the design is based on. Files named `flow-crop-*` are crops of the owner's page-flow mock-up, showing how that section should sit on the page. `frame-NN` files are stills from screen recordings in time order.
- Each SPEC.md ends with `Differences` (design vs inspiration, and whether on purpose) and 21st.dev components to look at.

## Stack and rules

Next.js (App Router) + TypeScript + Tailwind + shadcn/ui (Base UI) + Supabase. Use the shadcn MCP and the 21st.dev Magic MCP to find parts. Rebuild each section as `components/landing/<name>.tsx`; keep all sample text and numbers in `lib/mock/<name>.ts` and pass them as props.

Tokens: font Inter. ink #0b0b0b, grey #6b6b66, hairline #e4e4e0, soft #f2f2f0, pill #efefec, terracotta #a95443 (main buttons, white text), live green #1f6f4a, warning red #b4361b. Quiet white Posh style: white page, hairlines instead of shadows, pill buttons, no decorative gradients, huge tight headlines (weight 500, tracking about -0.045em, line-height 0.95).

Accessibility: 44px touch targets, 4.5:1 text contrast, real buttons and links, respect prefers-reduced-motion, a visible Pause control for anything that moves on its own.

## Brand name

The brand is **TikoPoa**. The design files still say "BRAND" and show a "B" logo or avatar. Replace "BRAND" with "TikoPoa" and the "B" avatar with "T" when you build (the owner's mock-up shows "TikoPoa" and "TikoPoa live" with a "T" avatar).

## Working method (one section at a time)

For each section, in order: read its SPEC.md and design file, look at the inspiration images, find parts with the MCPs and show the owner the candidates before installing, build the component, then screenshot at 390px and at desktop width with Playwright, compare to the design, fix every difference, run typecheck and lint, and report.

Placeholders that still need the client: refund and transfer policy, fees, real company description. All numbers, organizers and events are samples.
