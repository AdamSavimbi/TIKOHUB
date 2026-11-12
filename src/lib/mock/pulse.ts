/**
 * Sample content for the "Live pulse" landing section.
 * Replace with real data (Supabase) later; the component only reads this shape.
 */

export type PulseSender = "site" | "visitor";

export type PulsePoster = {
  /** Real poster image URL. When null, `placeholder` is used as a CSS background. */
  src: string | null;
  /** Placeholder art (CSS background value) while there is no real poster. */
  placeholder: string;
};

export type PulseMessage =
  | { kind: "text"; from: PulseSender; text: string }
  | {
      kind: "ticket";
      from: "site";
      title: string;
      when: string;
      stock: string;
      cta: string;
      href: string;
      poster: PulsePoster;
    }
  /** Highlighted bubble showing the live countdown. `{time}` is replaced with HH:MM:SS. */
  | { kind: "countdown"; from: "site"; template: string };

export type PulseContent = {
  label: string;
  headline: string;
  nextOnSale: {
    label: string;
    /** The pinned event. Change these fields to pin a different event. */
    eventName: string;
    /** The event's page. */
    href: string;
    /** Accessible name of the arrow link to the event page. */
    linkLabel: string;
    /**
     * The event's banner, shown behind the countdown with a dark tint so the
     * white text stays readable. Path under /public (e.g. "/events/jazz.jpg"),
     * or null for the plain grey card.
     */
    banner: string | null;
    /** Seconds until the sale opens, counted from page load. */
    secondsUntil: number;
    timerLabel: string;
    units: { hours: string; minutes: string; seconds: string };
  };
  chat: {
    brandInitial: string;
    title: string;
    badge: string;
    /** One text summary for screen readers, read instead of every bubble. */
    summary: string;
    messages: PulseMessage[];
  };
  caption: string;
};

export const pulseContent: PulseContent = {
  label: "Live",
  headline: "Happening right now.",
  nextOnSale: {
    label: "Next on-sale",
    eventName: "Jazz at the Gardens",
    href: "/events/jazz-at-the-gardens",
    linkLabel: "View Jazz at the Gardens",
    banner: null,
    secondsUntil: 2 * 3600 + 14 * 60 + 9,
    timerLabel: "Time until the sale opens",
    units: { hours: "Hrs", minutes: "Min", seconds: "Sec" },
  },
  chat: {
    brandInitial: "T",
    title: "TikoPoa live",
    badge: "Sample activity",
    summary:
      "Sample activity: 1,284 people are browsing right now. Rooftop Sessions has 412 tickets left and they are going fast. Sales for Jazz at the Gardens open when the countdown above reaches zero.",
    messages: [
      { kind: "text", from: "site", text: "1,284 people are browsing right now." },
      { kind: "text", from: "visitor", text: "How many Rooftop Sessions tickets are left?" },
      { kind: "text", from: "site", text: "412 left, and they are going fast." },
      {
        kind: "ticket",
        from: "site",
        title: "Rooftop Sessions",
        when: "Fri 31 Oct · 7 PM",
        stock: "412 left",
        cta: "Get tickets",
        href: "#",
        poster: {
          src: null,
          placeholder: "linear-gradient(160deg, #2b2f3a 0%, #7d5f4b 100%)",
        },
      },
      { kind: "text", from: "visitor", text: "And Jazz at the Gardens?" },
      { kind: "countdown", from: "site", template: "Sales open in {time}" },
    ],
  },
  caption:
    "Sample conversation. In the live product these messages show real traffic, real stock and the real next on-sale.",
};
