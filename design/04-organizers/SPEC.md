# 04 Organizers

- Design file: `design/Organizers.dc.html` (mobile).
- Inspiration: `inspiration/frame-01..10.jpg` (Posh recording of the organizer showcase) and `inspiration/flow-crop-organizers.png` (how it sits in the page flow).

## Layout (match Posh)
- Heading and one line of sub-text on the left; a black pill button ("for organizers") on the right, above the image. The current design has the heading and buttons stacked; use Posh's arrangement on desktop.
- One large rounded panel. Organizer names stacked and centred: the active one full white, the others faded. The background image fills the panel and changes with the active name. Caption bottom-left (city and "N events this year"), "View organizer" pill bottom-right.
- Below the panel: three short benefit rows (Sell in minutes, See sales live, Check in with a scan).

## Behaviour
- Auto-advances every about 3.2 seconds with a crossfade on the background and a smooth shift of the name list. Tapping a name selects it and stops the rotation. A visible Pause/Play button. Reduced motion: no auto-advance.
- Organizer names, counts and images are placeholders (gradients until real photos).

## 21st.dev
- Cinematic List: https://21st.dev/@daiwiikharihar/components/cinematic-list
- Hover Image List: https://21st.dev/@educalvolpz/components/hover-image-list
