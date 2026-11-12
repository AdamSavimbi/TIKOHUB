import Link from "next/link";

import type { SiteHeaderContent } from "@/lib/mock/site-header";

type SiteHeaderProps = { content: SiteHeaderContent };

/** Top of every page: the wordmark, on the same left edge as the sections below it. */
export function SiteHeader({ content }: SiteHeaderProps) {
  const { brand } = content;

  return (
    <header className="px-4 pt-5 md:px-[clamp(16px,3.4vw,48px)] md:pt-8">
      <div className="mx-auto flex w-full max-w-(--breakpoint-2xl) items-center">
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
