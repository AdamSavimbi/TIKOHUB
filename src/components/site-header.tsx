"use client";

import { NavigationMenu } from "@base-ui/react/navigation-menu";
import { Popover } from "@base-ui/react/popover";
import { ArrowUpRight, Search, X } from "lucide-react";
import Form from "next/form";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";

import { buttonVariants } from "@/components/ui/button";
import type { HeaderFeature, HeaderMenu, SiteHeaderContent } from "@/lib/mock/site-header";
import { cn } from "@/lib/utils";

type SiteHeaderProps = { content: SiteHeaderContent };

/*
 * Frosted surfaces. Where backdrop blur is unsupported, a plain translucent
 * tint (backdrop) or a solid pill grey (panels) is used instead.
 */
// Class names are written out in full so Tailwind can find them.
const backdropClass = cn(
  "fixed inset-0 z-30 bg-background/55 transition-opacity duration-200",
  "supports-[backdrop-filter:blur(1px)]:bg-background/40 supports-[backdrop-filter:blur(1px)]:backdrop-blur-[16px]",
  "data-starting-style:opacity-0 data-ending-style:opacity-0",
);
const panelSurface = cn(
  "bg-pill shadow-float",
  "supports-[backdrop-filter:blur(1px)]:bg-pill/85 supports-[backdrop-filter:blur(1px)]:backdrop-blur-[24px]",
);
const panelMotion =
  "transition-[opacity,translate] duration-200 ease-out data-starting-style:-translate-y-1.5 data-starting-style:opacity-0 data-ending-style:opacity-0";

/** White circle used for the search, close and menu buttons. */
const circleButton =
  "flex size-11 shrink-0 items-center justify-center rounded-pill bg-background text-foreground transition-colors hover:bg-secondary lg:size-12";

/**
 * Top of every page, fixed while scrolling: the TikoPoa wordmark and the
 * header pill. Desktop: links that open a frosted dropdown panel, search,
 * "Log in" and "Create event". Phones: the wordmark inside the pill, search,
 * a black "Log in" and a menu button that opens the links as a list.
 */
export function SiteHeader({ content }: SiteHeaderProps) {
  const { brand, search } = content;
  const pillRef = useRef<HTMLDivElement>(null);
  const searchButtonRef = useRef<HTMLButtonElement>(null);
  const searchInputRef = useRef<HTMLInputElement>(null);
  const [searchOpen, setSearchOpen] = useState(false);
  // Set when search closes, so focus goes back to the search button.
  const returnFocus = useRef(false);

  useEffect(() => {
    if (searchOpen) {
      searchInputRef.current?.focus();
    } else if (returnFocus.current) {
      returnFocus.current = false;
      searchButtonRef.current?.focus();
    }
  }, [searchOpen]);

  function closeSearch() {
    returnFocus.current = true;
    setSearchOpen(false);
  }

  return (
    <header className="sticky top-0 z-40 bg-background px-4 pt-3 pb-2 lg:px-5 lg:pt-5 lg:pb-3">
      <div className="lg:grid lg:grid-cols-[minmax(max-content,1fr)_minmax(0,880px)_1fr] lg:items-center lg:gap-6">
        <Link
          href={brand.href}
          className="hidden min-h-11 items-center self-center justify-self-start font-wordmark text-[24px] leading-none font-black tracking-[-0.045em] italic font-stretch-[125%] lg:inline-flex"
        >
          {brand.name}
        </Link>

        <div
          ref={pillRef}
          data-testid="header-pill"
          className="flex h-14 items-center gap-2 rounded-pill bg-pill p-1.5 text-pill-foreground outline-ring has-[input:focus]:outline-2 has-[input:focus]:outline-offset-2 lg:h-16 lg:p-2"
        >
          {searchOpen ? (
            <Form
              action={search.action}
              role="search"
              className="flex min-w-0 flex-1 items-center gap-2"
            >
              <span aria-hidden="true" className="flex h-11 w-8 shrink-0 items-center justify-end lg:size-12 lg:justify-center">
                <Search className="size-5" />
              </span>
              <input
                ref={searchInputRef}
                type="search"
                name={search.param}
                aria-label={search.openLabel}
                placeholder={search.placeholder}
                autoComplete="off"
                enterKeyHint="search"
                onKeyDown={(e) => {
                  if (e.key === "Escape") {
                    e.preventDefault();
                    closeSearch();
                  }
                }}
                className="h-11 min-w-0 flex-1 bg-transparent text-base outline-none focus-visible:outline-none lg:h-12 lg:text-[17px] [&::-webkit-search-cancel-button]:hidden"
              />
              <button
                type="button"
                aria-label={search.closeLabel}
                onClick={closeSearch}
                className={circleButton}
              >
                <X className="size-[18px]" aria-hidden="true" />
              </button>
            </Form>
          ) : (
            <>
              {/* Phones: the wordmark sits inside the pill (owner decision). */}
              <Link
                href={brand.href}
                className="inline-flex min-h-11 shrink-0 items-center pl-2.5 font-wordmark text-[20px] leading-none font-black tracking-[-0.045em] italic font-stretch-[125%] lg:hidden"
              >
                {brand.name}
              </Link>

              <DesktopNav content={content} anchor={pillRef} />
              <div className="flex-1 lg:hidden" />

              <button
                ref={searchButtonRef}
                type="button"
                aria-label={search.openLabel}
                onClick={() => setSearchOpen(true)}
                className={circleButton}
              >
                <Search className="size-5" aria-hidden="true" />
              </button>
              {/* "Log in": black on phones (the pill's one action), white on desktop. */}
              <Link
                href={content.login.href}
                className={cn(
                  buttonVariants({ variant: "ink" }),
                  "h-11 px-[18px] text-sm lg:h-12 lg:bg-background lg:px-[22px] lg:text-[15px] lg:text-foreground lg:hover:bg-secondary",
                )}
              >
                {content.login.label}
              </Link>
              {/* "Create event": desktop pill only; on phones it is in the menu. */}
              <Link
                href={content.createEvent.href}
                className={cn(
                  buttonVariants({ variant: "ink" }),
                  "hidden h-12 px-[22px] text-[15px] lg:inline-flex",
                )}
              >
                {content.createEvent.label}
              </Link>
              <MobileMenu content={content} anchor={pillRef} />
            </>
          )}
        </div>
      </div>
    </header>
  );
}

type PartProps = {
  content: SiteHeaderContent;
  anchor: React.RefObject<HTMLDivElement | null>;
};

/** Desktop links. Each opens a frosted panel the full width of the pill. */
function DesktopNav({ content, anchor }: PartProps) {
  return (
    <NavigationMenu.Root
      aria-label={content.navLabel}
      className="hidden min-w-0 flex-1 justify-center lg:flex"
    >
      <NavigationMenu.List className="flex items-center gap-1">
        {content.menus.map((menu) => (
          <NavigationMenu.Item key={menu.id} value={menu.id}>
            <NavigationMenu.Trigger
              data-testid={`menu-${menu.id}`}
              className="inline-flex h-12 items-center rounded-pill px-[18px] text-[15px] font-medium transition-colors hover:bg-background focus-visible:bg-background data-popup-open:bg-background"
            >
              {menu.label}
            </NavigationMenu.Trigger>
            <NavigationMenu.Content className="w-(--anchor-width)">
              <MenuPanel menu={menu} />
            </NavigationMenu.Content>
          </NavigationMenu.Item>
        ))}
      </NavigationMenu.List>

      <NavigationMenu.Portal>
        <NavigationMenu.Backdrop data-testid="menu-backdrop" className={backdropClass} />
        <NavigationMenu.Positioner
          anchor={anchor}
          side="bottom"
          align="start"
          sideOffset={10}
          collisionAvoidance={{ side: "none", align: "none" }}
          className="z-50"
        >
          <NavigationMenu.Popup
            className={cn(
              "h-(--popup-height) w-(--popup-width) overflow-hidden rounded-[32px] outline-none",
              panelSurface,
              panelMotion,
            )}
          >
            <NavigationMenu.Viewport className="relative size-full" />
          </NavigationMenu.Popup>
        </NavigationMenu.Positioner>
      </NavigationMenu.Portal>
    </NavigationMenu.Root>
  );
}

function MenuPanel({ menu }: { menu: HeaderMenu }) {
  return (
    <div
      data-testid="menu-panel"
      className="grid grid-cols-[1fr_1fr_1.15fr] gap-7 p-7"
    >
      {menu.columns.map((column) => (
        <div key={column.heading}>
          <p className="eyebrow mb-2">{column.heading}</p>
          <ul>
            {column.links.map((link) => (
              <li key={link.href + link.label}>
                <NavigationMenu.Link
                  render={<Link href={link.href} />}
                  className="flex min-h-11 items-center text-base font-medium underline-offset-4 hover:underline"
                >
                  {link.label}
                </NavigationMenu.Link>
              </li>
            ))}
          </ul>
        </div>
      ))}
      <NavigationMenu.Link
        render={<Link href={menu.feature.href} />}
        className="flex min-h-56 flex-col justify-between rounded-[24px] bg-background p-6 transition-colors hover:bg-secondary"
      >
        {/* Photo slot: until event photos land (#7) the card leads with an arrow. */}
        {menu.feature.image ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={menu.feature.image.src}
            alt={menu.feature.image.alt}
            className="mb-4 h-30 w-full rounded-[16px] object-cover"
          />
        ) : (
          <ArrowUpRight className="size-6 self-end" aria-hidden="true" />
        )}
        <span>
          <FeatureText feature={menu.feature} />
        </span>
      </NavigationMenu.Link>
    </div>
  );
}

function FeatureText({ feature, compact = false }: { feature: HeaderFeature; compact?: boolean }) {
  return (
    <>
      <span className="eyebrow block">{feature.eyebrow}</span>
      <span
        className={cn(
          "mt-1 block font-semibold tracking-[-0.02em]",
          compact ? "text-[17px] leading-snug" : "text-2xl leading-tight",
        )}
      >
        {feature.title}
      </span>
      <span className="mt-1 block text-sm text-muted-foreground">{feature.text}</span>
    </>
  );
}

/** Phones: a menu button that opens the links as a list under the pill. */
function MobileMenu({ content, anchor }: PartProps) {
  const { mobileMenu } = content;
  const [open, setOpen] = useState(false);
  const popupRef = useRef<HTMLDivElement>(null);

  return (
    <Popover.Root open={open} onOpenChange={setOpen}>
      <Popover.Trigger
        aria-label={mobileMenu.label}
        className={cn(
          circleButton,
          "group data-popup-open:bg-ink data-popup-open:text-ink-foreground lg:hidden",
        )}
      >
        <svg
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          aria-hidden="true"
          className="size-5 group-data-popup-open:hidden"
        >
          <path d="M4 8h16M4 16h16" />
        </svg>
        <X className="hidden size-[18px] group-data-popup-open:block" aria-hidden="true" />
      </Popover.Trigger>

      <Popover.Portal>
        <Popover.Backdrop data-testid="menu-backdrop" className={backdropClass} />
        <Popover.Positioner
          anchor={anchor}
          side="bottom"
          align="start"
          sideOffset={8}
          collisionAvoidance={{ side: "none", align: "none" }}
          className="z-50"
        >
          <Popover.Popup
            ref={popupRef}
            // Keyboard: focus the first link. Tap or click: focus the list itself, so no link looks selected.
            initialFocus={(type) => (type === "keyboard" ? true : popupRef.current)}
            className={cn(
              "w-(--anchor-width) rounded-panel p-3 outline-none",
              panelSurface,
              panelMotion,
            )}
          >
            <nav aria-label={content.navLabel}>
              <ul>
                {mobileMenu.links.map((link) => (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      onClick={() => setOpen(false)}
                      className="flex min-h-14 items-center rounded-[18px] px-4 text-[26px] font-medium tracking-[-0.02em] hover:bg-background focus-visible:bg-background"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
              <Link
                href={mobileMenu.feature.href}
                onClick={() => setOpen(false)}
                className="mt-2.5 block rounded-[20px] bg-background p-4"
              >
                <FeatureText feature={mobileMenu.feature} compact />
              </Link>
            </nav>
          </Popover.Popup>
        </Popover.Positioner>
      </Popover.Portal>
    </Popover.Root>
  );
}
