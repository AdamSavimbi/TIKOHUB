# Design source (from the Claude Design file "Landing Page Design")

Each *.dc.html is ONE artboard (a section of the landing page). They are a custom
design-component format, NOT React. Treat them as the visual spec: copy the layout,
spacing, colours, copy and behaviour, and rebuild each as a React/Next.js component
with Tailwind + shadcn/ui.

- canvas.json: artboard list, sizes and designer notes (the notes describe the behaviour)
- Main.dc.html = mobile hero, Desktop.dc.html = desktop hero (fluid)
- Pulse, HowItWorks, Browse, Proof, Organizers, Faq, Footer = sections in scroll order (mobile, 390px wide)

Tokens: Inter font; ink #0b0b0b; grey #6b6b66; hairline #e4e4e0; soft #f2f2f0 / #efefec;
terracotta #a95443 (buttons); live green #1f6f4a. Quiet white Posh style.
Behaviours to keep: right-to-left lineup with pause, pill menu with blurred overlay,
count-up stats (IntersectionObserver, reduced-motion safe), live chat loop, organizer rotation with pause.
All numbers/organizers are placeholders. Brand name is "BRAND" until decided.
