# Handoff: TikoPoa landing page

You are picking up planned work with no memory of the planning session. Everything decided is written down; do not re-plan or re-interview the owner. Start the first unblocked ticket.

## Where the work is defined

The tickets are GitHub issues in `AdamSavimbi/TIKOHUB`, not files in the repo. Read them with `gh`.

- **Spec (parent):** #4, "Landing page: build every section to match its inspiration". Read all of it first: `gh issue view 4`.
- **Tickets (sub-issues of #4), a strict chain, each blocked by the one before:**
  - #5 Groundwork: page tests, corrected rules, Live pulse first
  - #6 Header pill
  - #7 Hero with the lineup
  - #8 Proof
  - #9 Organizers
  - #10 How it works
  - #11 Browse
  - #12 FAQ
  - #13 Footer
- **Next ticket:** the lowest-numbered open one whose blocker is closed. Check with `gh issue list --state open` and `gh issue view <n> --json blockedBy`.

## What to read before writing code

1. `CLAUDE.md` and `AGENTS.md` (project rules: tokens, accessibility, mock data, verification steps).
2. `GLOSSARY.md` (use these terms exactly).
3. `gh issue view 4`, then the ticket you are starting.
4. `design/README.md`, `design/PAGE_FLOW.md`, then the section's folder under `design/`: `SPEC.md`, the `.dc.html` design file, and every image in `inspiration/`. Look at the images; the owner judges the result against them.
5. `design/00-page-flow/desired-page-flow.png` (the owner's mock-up of the whole page).
6. `src/components/landing/pulse.tsx` and `src/lib/mock/pulse.ts`: the pattern every section follows (one component, one typed content prop, sample data in a mock module).
7. The relevant guide in `node_modules/next/dist/docs/`. This Next.js version differs from what you know.

## Where issue #4 overrides the design pack

The section `SPEC.md` files were written before the owner's final decisions. Where they disagree, #4 wins:

- **No Pause/Play buttons** on Live pulse, the lineup or Organizers, and all three keep moving under reduced motion (`data-motion="always"`). Owner decision. Do not add pause controls as an accessibility fix. Ticket #5 corrects `CLAUDE.md` and the specs.
- **Hero:** the lineup is only Mookh-style cards, edge to edge on white. No Posh poster strip, no frame, no QR code. Hover enlarges, pauses and selects. The headline shows the selected event's category.
- **Proof:** not HustleSasa's four columns and not orange. One hero stat plus three, with odometer digits.
- **Colours and font are always ours.** "Match the inspiration" means layout, proportions, type scale and motion.

## How to work each ticket

1. Cut a branch from fresh `main`: `feat/<section>` (`chore/groundwork` for #5).
2. Build the section. For sections with inspiration, match it closely. For How it works, Browse, FAQ and Footer there is none: build from the design file and be creative inside the quiet white theme.
3. Verify as `CLAUDE.md` says: `npx tsc --noEmit`, `npm run lint`, the page tests, then screenshots at 390px and 1440px compared with the design and inspiration. List and fix every difference.
4. Show the owner the screenshots and wait for approval. Only then open the pull request with `gh` (the GitHub MCP connector cannot create PRs), referencing the ticket.
5. After approval, add the section doc under `docs/sections/` and a `docs/CHANGELOG.md` entry.
6. The owner merges, or tells you to. Then start the next ticket from fresh `main`.

One ticket per branch and PR. Do not combine or split tickets; the owner decided this.

## Things the issues do not say

- **`GLOSSARY.md` is uncommitted on `main`.** Commit it in #5.
- **`.scratch/` is not in `.gitignore`.** Add it in #5, or delete this file once the work is underway.
- **No test tooling exists yet.** #5 adds Playwright as a dev dependency with a test command. The Playwright MCP is separate and is for screenshots.
- **No animation library.** Motion is CSS keyframes registered as theme tokens in the global stylesheet, plus small hooks. CSS modules do not work in this repo (see `CLAUDE.md`). Ask the owner before adding `motion` or GSAP.
- **Placeholder photos:** Unsplash only, saved into the repo, referenced from the mock data. Never copy artwork from Posh, Mookh, Partiful or HustleSasa.
- **21st.dev:** `search` is free; `get_component` uses a paid daily quota. Fetch source only for the hard parts (dropdown, moving row, name list) and rewrite it for our tokens and Base UI; never paste it in. Write the simple sections in-house.
- **Never write under `design/` without running `ls` on the target first.** A file there was lost once.
- **The owner is not a developer.** Report in plain language: what changed, screenshots, anything uncertain.

## 21st.dev references found during planning

Reference only. Nothing is installed.

| Section | Closest component |
|---|---|
| Header pill | https://21st.dev/@hyperiux/components/elevate-navbar (drop its GSAP and glass effects) |
| Header search | https://21st.dev/@arunachalam/components/expandable-search-bar |
| Lineup | https://21st.dev/@kevingirelli/components/marquee , fallback https://21st.dev/@diceui/components/marquee |
| Proof | https://21st.dev/@dillionverma/components/number-ticker (ours is an odometer; this is only a starting point) |
| Organizers | https://21st.dev/@daiwiikharihar/components/cinematic-list , autoplay ideas from https://21st.dev/@kedhareswer/components/index-list-carousel |
| How it works | https://21st.dev/@ln-dev7/components/how-it-works-09 |
| Browse chips | https://21st.dev/@amankaushik481/components/chip-filter |
| FAQ | https://21st.dev/@arihantcodes_1f7b8c4d/components/accordion-ghost (build on shadcn's Base UI accordion) |
| Footer | https://21st.dev/@meschacirung/components/footer-2 |
