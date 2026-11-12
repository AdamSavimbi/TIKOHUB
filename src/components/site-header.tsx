import Link from "next/link";

import type { SiteHeaderContent } from "@/lib/mock/site-header";

type SiteHeaderProps = { content: SiteHeaderContent };

/** Top of every page: the wordmark, tucked into the top-left corner (owner decision), outside the section gutter. */
export function SiteHeader({ content }: SiteHeaderProps) {
  const { brand } = content;

  return (
    <header className="px-4 pt-2 md:px-5 md:pt-3">
      <div className="flex w-full items-center">
        <Link
          href={brand.href}
          className="headline inline-flex min-h-11 items-center text-[36px] leading-none md:text-[56px] lg:text-[64px]"
        >
          {brand.name}
        </Link>
      </div>
    </header>
  );
}
