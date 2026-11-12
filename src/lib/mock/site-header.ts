/**
 * Content for the site header shown at the top of every page.
 * Today it is only the wordmark; the header pill (links, search, buttons) joins it later.
 */

export type SiteHeaderContent = {
  brand: {
    /** Wordmark text. */
    name: string;
    /** Where the wordmark links to. */
    href: string;
  };
};

export const siteHeaderContent: SiteHeaderContent = {
  brand: { name: "TikoPoa", href: "/" },
};
