# 03 Proof (stats that count up)

> **GitHub issue #4 overrides this spec where they disagree.** The layout is not HustleSasa's four columns: it is one hero stat shown very large plus three supporting stats (desktop: hero stat on the left half, three stacked on the right with hairlines; mobile: hero stat first, then three rows). The numbers do not count up: each digit rolls into place like an odometer, staggered left to right, once. No "Replay" button.

- Design file: `design/Proof.dc.html` (mobile).
- Inspiration: `inspiration/frame-01..08.jpg` (HustleSasa recording: numbers count up as the section scrolls in) and `inspiration/flow-crop-proof.png` (the owner's mock-up shows HustleSasa's section: small caps heading left, a sentence right, four tall columns with a label and a one-line caption).

## Layout
- Heading (ours: "Proof, not promises."), one-line sub-text.
- Four stats: EVENTS HOSTED 1,240+, TICKETS SOLD 86k+, ORGANIZERS SELLING 320+, ACTIVE CITIES 6. Uppercase label, short caption, huge tabular numeral. Mobile: stacked rows with hairlines. Desktop: four columns like HustleSasa.
- Visual style is QUIET WHITE (Posh), NOT HustleSasa's orange.

## Behaviour
- Count up from 0 once when the section is about 40% visible (IntersectionObserver), about 2 seconds, ease-out. Reduced motion: show the final numbers at once. Screen readers get the final value as text; the animated number is aria-hidden.
- Numbers are placeholders. Keep them in `lib/mock/proof.ts`.

## 21st.dev
- Number Ticker (Magic UI): https://21st.dev/community/components/dillionverma/number-ticker
- Count Up Stats: https://21st.dev/@rigayaya83/components/count-up-stats
