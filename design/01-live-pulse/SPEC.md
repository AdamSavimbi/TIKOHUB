# 01 Live pulse

The first section under the header.

- Design file: `design/Pulse.dc.html` (mobile single column).
- Inspiration: `inspiration/frame-01..12.jpg` (Partiful iMessage chat, in time order) and `inspiration/flow-crop-pulse-and-pill.png` (how it sits on the page).

## Layout
- Mobile: LIVE label (green, pulsing dot), headline "Happening right now.", the countdown card, the chat panel, a caption.
- Desktop (from the mock-up): two columns. Left: LIVE label, headline, "NEXT ON-SALE" countdown card (HRS : MIN : SEC, large tabular numerals). Right: the chat panel with header "TikoPoa live" and "Sample activity", messages stacked at the bottom, caption under it.

## Behaviour
- Countdown starts at 02:14:09 and ticks every second (role="timer").
- Chat loops on a 22-second cycle: site bubble (grey, left, avatar) "1,284 people are browsing right now." then visitor bubble (black, right) "How many Rooftop Sessions tickets are left?" then site "412 left, and they are going fast." then a ticket card bubble (poster, name, date, "412 left" in warning red, black "Get tickets" button) then visitor "And Jazz at the Gardens?" then site bubble in terracotta "Sales open in HH:MM:SS" using the live countdown.
- Typing dots about 2 seconds before each message. New bubbles fade and slide up.
- No Pause/Play button, and the chat keeps looping under reduced motion (owner decision, GitHub issue #4).

## Differences
- Messages carry live traffic, stock and a countdown instead of party chat (on purpose).
- Sent bubbles are black, not blue; light theme.
- Partiful puts the chat over a photo beside its hero; here it is its own section.

## 21st.dev
- iMessage Chat Flow: https://21st.dev/@framecn/components/imessage-chat-flow
- Typing Indicator: https://21st.dev/@ddoemonn/components/typing-indicator
- Event Countdown Card: https://21st.dev/@isaiahbjork/components/event-countdown-card
