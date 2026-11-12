# 02 Hero (Posh layout + Mookh lineup)

> **GitHub issue #4 overrides this spec where they disagree.** The lineup is only Mookh-style cards, edge to edge on white: no Posh poster strip at the edges and no frame behind the cards. The headline shows the selected event's category, not "Find your world.". Hover (desktop), tap or keyboard focus selects a card; the selected card stays slightly enlarged.

- Design files: `design/Main.dc.html` (mobile) and `design/Desktop.dc.html` (desktop). Ignore the pill bar in these files; it moved to `00-global-header-pill`.
- Inspiration:
  - `inspiration/posh-hero.png`: Posh hero, the layout backbone.
  - `inspiration/flow-crop-hero.png`: how the owner wants it composed.
  - `inspiration/mookh-snippet-in-hero.png`: the Mookh "Top picks" frame the owner placed in the middle of Posh's poster strip.
  - `inspiration/frame-01..06.jpg`: Mookh lineup recording (cards sliding right to left).
  - `inspiration/mookh-search-bar.png`: Mookh search bar (see open decisions in PAGE_FLOW.md).

## Layout
- Giant tight headline, right-aligned on desktop (design says "Find your world.").
- Poster lineup in a single moving strip. Centre: the Mookh-style cards (large, dark, date badge top-left in white, big title top, venue with pin and "from KES price" at the bottom, under a small label "Top picks from our staff"). Edges: Posh-style small posters, fading out left and right. Cards are 4:5-ish with rounded corners.
- Under the strip: selected event on the left (title, date, venue, people going or tickets left), "View event" (terracotta) and "View all" (grey).
- QR code and "Download the full experience" are REMOVED (web only).

## Behaviour
- The strip moves right to left continuously. Hover or press-and-hold pauses it. Tapping or clicking a card selects it and updates the details below, with a visible ring on the selected card.
- No Pause/Play button, and the lineup keeps moving under reduced motion (owner decision, GitHub issue #4). Hover, keyboard focus and press-and-hold stay as the ways to stop it.

## Differences
- QR removed on purpose.
- The design's lineup is a single card style; the owner's mock-up combines Posh posters at the edges with Mookh cards in the centre. Build the mock-up version.
- Poster art is placeholder gradients until real photos exist.

## 21st.dev
- Marquee (Magic UI): https://21st.dev/@dillionverma/components/marquee
- Infinite Moving Cards: https://21st.dev/@nexus-ui/components/infinite-moving-cards
