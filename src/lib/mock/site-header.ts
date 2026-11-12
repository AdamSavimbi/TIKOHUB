/**
 * Content for the site header shown at the top of every page:
 * the TikoPoa wordmark and the header pill (links, search, buttons, dropdown panels).
 * Links point to their future routes and 404 until those pages exist.
 */

export type HeaderLink = {
  label: string;
  href: string;
};

/** One column of links in a dropdown panel, e.g. "Browse". */
export type HeaderLinkColumn = {
  heading: string;
  links: HeaderLink[];
};

/** The single card on the right of a dropdown panel. */
export type HeaderFeature = {
  eyebrow: string;
  title: string;
  text: string;
  href: string;
  /** Optional photo. Placeholder photos are recorded beside the data that uses them. */
  image?: { src: string; alt: string };
};

/** A link in the pill that opens a dropdown panel, e.g. "Explore". */
export type HeaderMenu = {
  /** Stable key, also used in test ids. */
  id: string;
  label: string;
  columns: HeaderLinkColumn[];
  feature: HeaderFeature;
};

export type SiteHeaderContent = {
  brand: {
    /** Wordmark text. */
    name: string;
    /** Where the wordmark links to. */
    href: string;
  };
  /** Accessible name of the main navigation. */
  navLabel: string;
  menus: HeaderMenu[];
  login: HeaderLink;
  createEvent: HeaderLink;
  search: {
    /** Accessible name of the search icon button and the field. */
    openLabel: string;
    closeLabel: string;
    placeholder: string;
    /** The future events route the query is sent to. */
    action: string;
    /** Query parameter name, e.g. /events?q=jazz. */
    param: string;
  };
  /** The menu button and list shown on phones ("Log in" is in the pill, so the list has "Create event"). */
  mobileMenu: {
    /** Accessible name of the menu button; its open state is announced separately. */
    label: string;
    links: HeaderLink[];
    feature: HeaderFeature;
  };
};

const sellingFast: HeaderFeature = {
  eyebrow: "Selling fast",
  title: "Rooftop Sessions",
  text: "Fri 31 Oct · 412 tickets left",
  href: "/events/rooftop-sessions",
};

export const siteHeaderContent: SiteHeaderContent = {
  brand: { name: "TikoPoa", href: "/" },
  navLabel: "Main",
  menus: [
    {
      id: "explore",
      label: "Explore",
      columns: [
        {
          heading: "Browse",
          links: [
            { label: "This weekend", href: "/events?when=weekend" },
            { label: "Free events", href: "/events?price=free" },
            { label: "Under KES 1,000", href: "/events?price=under-1000" },
            { label: "Live music", href: "/events?category=live-music" },
            { label: "Nightlife", href: "/events?category=nightlife" },
          ],
        },
        {
          heading: "Cities",
          links: [
            { label: "Nairobi", href: "/events?city=nairobi" },
            { label: "Mombasa", href: "/events?city=mombasa" },
            { label: "Kisumu", href: "/events?city=kisumu" },
            { label: "Nakuru", href: "/events?city=nakuru" },
            { label: "Eldoret", href: "/events?city=eldoret" },
          ],
        },
      ],
      feature: sellingFast,
    },
    {
      id: "organize",
      label: "Organize",
      columns: [
        {
          heading: "Sell tickets",
          links: [
            { label: "Create an event", href: "/create" },
            { label: "Fees and payouts", href: "/organizers/fees" },
            { label: "Organizer dashboard", href: "/organizers/dashboard" },
            { label: "Scan at the door", href: "/organizers/check-in" },
          ],
        },
        {
          heading: "Resources",
          links: [
            { label: "Waiting room for big sales", href: "/organizers/waiting-room" },
            { label: "Guides", href: "/organizers/guides" },
            { label: "Talk to us", href: "/help/contact" },
          ],
        },
      ],
      feature: {
        eyebrow: "Built for sale day",
        title: "Thousands at once",
        text: "A waiting room keeps checkout fast and stops overselling.",
        href: "/organizers/waiting-room",
      },
    },
    {
      id: "help",
      label: "Help",
      columns: [
        {
          heading: "Support",
          links: [
            { label: "Help centre", href: "/help" },
            { label: "Contact us", href: "/help/contact" },
            { label: "Lost a ticket", href: "/help/lost-ticket" },
          ],
        },
        {
          heading: "Your tickets",
          links: [
            { label: "My tickets", href: "/tickets" },
            { label: "Log in", href: "/login" },
            { label: "Create an account", href: "/signup" },
          ],
        },
      ],
      feature: {
        eyebrow: "Lost a ticket?",
        title: "Open it again",
        text: "Enter your phone number and we send the link.",
        href: "/help/lost-ticket",
      },
    },
  ],
  login: { label: "Log in", href: "/login" },
  createEvent: { label: "Create event", href: "/create" },
  search: {
    openLabel: "Search events",
    closeLabel: "Close search",
    placeholder: "Try “Free events this weekend”",
    action: "/events",
    param: "q",
  },
  mobileMenu: {
    label: "Menu",
    links: [
      { label: "Explore", href: "/events" },
      { label: "Organize", href: "/organizers" },
      { label: "My tickets", href: "/tickets" },
      { label: "Help", href: "/help" },
      { label: "Create event", href: "/create" },
    ],
    feature: sellingFast,
  },
};
