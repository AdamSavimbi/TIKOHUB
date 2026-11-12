# Live pulse

First section of the landing page, directly under the header: a live countdown to the next on-sale and a looping sample chat showing site activity.

- **Design spec:** `design/01-live-pulse/design/Pulse.dc.html` (behaviour in `design/01-live-pulse/SPEC.md`)
- **Status:** approved 2026-11-09

## Files

- `src/components/landing/pulse.tsx`: the section (client component).
- `src/lib/mock/pulse.ts`: all text and sample data, plus the `PulseContent` type.
- `src/app/page.tsx`: renders it first, directly under the header.
- `src/app/globals.css`: its animations (`animate-live-ping`, `animate-bubble-in`, `animate-typing-in`, `animate-typing-dot`).

## What it does

- **Live label:** green "LIVE" with a pulsing dot.
- **Next on-sale card:** the pinned event's name and an HRS : MIN : SEC countdown, ticking every second (`role="timer"`). A 44px arrow link in the corner goes to the event page. On desktop the card fits its digits and the chat takes the rest of the row.
- **Event banner:** when the pinned event has a banner, it fills the card behind a dark tint and the text turns white. Without one, the card is plain grey.
- **TikoPoa live chat:** 22-second loop of six messages. Typing dots for 2s before each; bubbles fade and slide up; older messages fade out at the top. Fixed 360px height.
- **Countdown bubble:** the last message ("Sales open in …") shows the live countdown.
- **Desktop:** countdown card and chat sit side by side; headline and digits scale up.

## Data

- The component takes `content: PulseContent` as a prop. Today it receives `pulseContent` from the mock file.
- Real data (Supabase) will replace it: visitor count, ticket stock, the next on-sale and its countdown.
- The countdown is "seconds from page load" for now; real data should give the actual opening time.
- **Pinning an event:** change `nextOnSale` in the mock file: `eventName`, `href`, `linkLabel`, `banner` (a path under `public/`, or `null`) and `secondsUntil`. Nothing about the event is in the markup.

## Accessibility

- The chat is hidden from screen readers and keyboard (`aria-hidden`, `inert`, `aria-live="off"`); one text summary is read instead.
- Text contrast at least 4.5:1; "Get tickets" is 44px tall.
- One interval drives everything and is cleared on unmount.

## Decisions

- **No Pause/Play button:** owner decision, recorded in the CLAUDE.md accessibility rules.
- **Animates under reduce-motion too:** owner decision. The section has `data-motion="always"`, which the global reduce-motion rule skips.
- **"Get tickets" in the chat is not clickable:** the whole chat is decorative, and a focusable button that disappears with the loop is worse for keyboard users.
- **Countdown bubble 5px wider than the design:** fixed-width digits, so the countdown doesn't jitter.
- **Banner behind the countdown, tinted:** owner idea, so the card isn't plain. The 60% ink tint keeps white text readable on most photos; check very bright banners before pinning.
- **Card sized to its digits on desktop:** owner asked to cut the empty space after the seconds.
- **Poster thumbnail colours are in the mock data:** placeholder art until real poster images exist.

## History

- 2026-11-12: Countdown card fits its digits, gains an event link and a banner slot ([changelog](../CHANGELOG.md#2026-11-12-header-pill)).
- 2026-11-12: Moved to first on the page, directly under the header ([changelog](../CHANGELOG.md#2026-11-12-groundwork-for-the-landing-page)).
- 2026-11-09: Section built to match the design at 390px and scaled for desktop ([changelog](../CHANGELOG.md#2026-11-09-live-pulse-section-and-design-preview)).
