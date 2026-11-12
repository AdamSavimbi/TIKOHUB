import Link from "next/link";

import type { SiteHeaderContent } from "@/lib/mock/site-header";

type SiteHeaderProps = { content: SiteHeaderContent };

/**
 * Top of every page: the wordmark, tucked into the top-left corner outside the
 * section gutter, and kept there while the page scrolls (owner decisions).
 * The white bar keeps it readable over whatever scrolls underneath.
 */
export function SiteHeader({ content }: SiteHeaderProps) {
  const { brand } = content;

  return (
    <header className="sticky top-0 z-40 flex h-14 items-center bg-background px-4 md:h-16 md:px-5">
      <Link
        href={brand.href}
        className="inline-flex min-h-11 items-center font-wordmark text-[20px] leading-none font-black tracking-[-0.045em] italic font-stretch-[125%] md:text-[24px]"
      >
        {brand.name}
      </Link>
    </header>
  );
}
