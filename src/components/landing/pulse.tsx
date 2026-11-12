"use client";

import { ArrowUpRight } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";

import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import type { PulseContent, PulseMessage, PulseSender } from "@/lib/mock/pulse";
import { cn } from "@/lib/utils";

/** Conversation timing, in seconds: one loop, first message, gap between messages, typing time. */
const LOOP_SECONDS = 22;
const FIRST_AT = 2;
const STEP_SECONDS = 3;
const TYPING_SECONDS = 2;

function pad(n: number) {
  return n.toString().padStart(2, "0");
}

function splitTime(totalSeconds: number) {
  const t = Math.max(0, totalSeconds);
  return {
    hh: pad(Math.floor(t / 3600)),
    mm: pad(Math.floor((t % 3600) / 60)),
    ss: pad(t % 60),
  };
}

type PulseProps = { content: PulseContent };

export function Pulse({ content }: PulseProps) {
  const { nextOnSale, chat } = content;
  const onBanner = nextOnSale.banner !== null;
  const [elapsed, setElapsed] = useState(0);

  // One clock drives both the countdown and the conversation loop.
  // The loop always runs, including with prefers-reduced-motion (owner decision).
  useEffect(() => {
    const id = window.setInterval(() => setElapsed((e) => e + 1), 1000);
    return () => window.clearInterval(id);
  }, []);
  const step = elapsed % LOOP_SECONDS;

  const time = splitTime(nextOnSale.secondsUntil - elapsed);
  const clock = `${time.hh}:${time.mm}:${time.ss}`;

  const schedule = chat.messages.map((message, i) => ({
    message,
    at: FIRST_AT + i * STEP_SECONDS,
  }));
  const shown = schedule.filter((m) => m.at <= step);
  const next = schedule.find((m) => m.at > step);
  const typingFrom: PulseSender | null =
    next && step >= next.at - TYPING_SECONDS ? next.message.from : null;

  return (
    <section
      aria-labelledby="pulse-heading"
      data-motion="always"
      className="px-4 pt-9 pb-6 md:px-[clamp(16px,3.4vw,48px)] md:pt-20 md:pb-16"
    >
      <div className="mx-auto w-full max-w-(--breakpoint-2xl)">
        <p className="flex items-center gap-2 text-xs leading-[normal] font-semibold tracking-[0.16em] text-success uppercase">
          <span
            aria-hidden="true"
            className="size-2 animate-live-ping rounded-full bg-success"
          />
          {content.label}
        </p>
        <h2
          id="pulse-heading"
          className="headline mt-3 text-[44px] leading-[0.98] text-wrap md:text-[64px] lg:text-[80px]"
        >
          {content.headline}
        </h2>

        <div className="mt-[22px] md:mt-10 md:grid md:grid-cols-[auto_minmax(0,1fr)] md:items-start md:gap-6">
          {/* Next on-sale: sized to its digits, with the event's banner behind it when there is one. */}
          <div
            data-testid="next-on-sale"
            className={cn(
              "relative isolate overflow-hidden rounded-card px-5 pt-[18px] pb-4 md:px-7 md:pt-6 md:pb-6",
              onBanner ? "bg-ink text-ink-foreground" : "bg-secondary",
            )}
          >
            {nextOnSale.banner && (
              <>
                <Image
                  src={nextOnSale.banner}
                  alt=""
                  fill
                  loading="eager"
                  sizes="(min-width: 768px) 560px, 100vw"
                  className="-z-10 object-cover"
                />
                {/* Tint keeps white text readable on any photo. */}
                <span aria-hidden="true" className="absolute inset-0 -z-10 bg-ink/60" />
              </>
            )}
            <Link
              href={nextOnSale.href}
              aria-label={nextOnSale.linkLabel}
              className="absolute top-3 right-3 flex size-11 items-center justify-center rounded-pill bg-background text-foreground transition-colors hover:bg-pill md:top-4 md:right-4"
            >
              <ArrowUpRight className="size-5" aria-hidden="true" />
            </Link>
            <p className={cn("eyebrow pr-12 leading-[normal]", onBanner && "text-ink-foreground/85")}>
              {nextOnSale.label}
            </p>
            <p className="mt-1 pr-12 text-xl leading-[normal] font-semibold tracking-[-0.01em]">
              {nextOnSale.eventName}
            </p>
            <div
              role="timer"
              aria-label={nextOnSale.timerLabel}
              className="mt-3 flex items-start gap-2.5"
            >
              <TimeUnit value={time.hh} unit={nextOnSale.units.hours} onBanner={onBanner} />
              <Colon onBanner={onBanner} />
              <TimeUnit value={time.mm} unit={nextOnSale.units.minutes} onBanner={onBanner} />
              <Colon onBanner={onBanner} />
              <TimeUnit value={time.ss} unit={nextOnSale.units.seconds} onBanner={onBanner} />
            </div>
          </div>

          <div className="mt-3.5 md:mt-0">
            {/* Chat panel */}
            <div className="overflow-hidden rounded-panel border">
              <div className="flex items-center gap-2.5 border-b bg-background px-4 py-3">
                <BrandAvatar initial={chat.brandInitial} />
                <span className="text-sm leading-[normal] font-semibold">{chat.title}</span>
                <span className="ml-auto text-xs leading-[normal] text-muted-foreground">
                  {chat.badge}
                </span>
              </div>

              <p className="sr-only">{chat.summary}</p>

              {/* Decorative conversation: hidden from assistive tech and not focusable. */}
              <div
                aria-live="off"
                aria-hidden="true"
                inert
                className="flex h-[360px] flex-col justify-end gap-2 overflow-hidden bg-secondary/30 px-3 pt-3 pb-3.5 [mask-image:linear-gradient(to_bottom,transparent,black_48px)]"
              >
                {shown.map(({ message, at }) => (
                  <Bubble key={at} message={message} clock={clock} brandInitial={chat.brandInitial} />
                ))}
                {typingFrom && (
                  <Typing from={typingFrom} brandInitial={chat.brandInitial} />
                )}
              </div>
            </div>

            <p className="mt-3 text-xs leading-[1.4] text-muted-foreground">
              {content.caption}
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}

function TimeUnit({ value, unit, onBanner }: { value: string; unit: string; onBanner: boolean }) {
  return (
    <div className="flex flex-col gap-1">
      <span className="text-[54px] leading-none font-medium tracking-[-0.04em] tabular-nums md:text-[64px] lg:text-[96px]">
        {value}
      </span>
      <span className={cn("eyebrow leading-[normal]", onBanner && "text-ink-foreground/85")}>{unit}</span>
    </div>
  );
}

function Colon({ onBanner }: { onBanner: boolean }) {
  return (
    <span
      aria-hidden="true"
      className={cn(
        "text-[40px] leading-[1.1] md:text-[48px] lg:text-[72px]",
        onBanner ? "text-ink-foreground/60" : "text-muted-foreground/55",
      )}
    >
      :
    </span>
  );
}

function BrandAvatar({ initial }: { initial: string }) {
  return (
    <Avatar aria-hidden="true" className="size-7 after:hidden">
      <AvatarFallback className="bg-ink text-[13px] font-extrabold text-ink-foreground">
        {initial}
      </AvatarFallback>
    </Avatar>
  );
}

const siteRadius = "rounded-[20px_20px_20px_6px]";
const visitorRadius = "rounded-[20px_20px_6px_20px]";

function Bubble({
  message,
  clock,
  brandInitial,
}: {
  message: PulseMessage;
  clock: string;
  brandInitial: string;
}) {
  const fromSite = message.from === "site";

  return (
    <div
      className={cn(
        "flex flex-none items-end gap-2",
        fromSite ? "justify-start" : "justify-end",
        "animate-bubble-in",
      )}
    >
      {fromSite && <BrandAvatar initial={brandInitial} />}

      {message.kind === "ticket" ? (
        <div className={cn("w-[236px] border bg-background p-3", siteRadius)}>
          <div className="flex items-center gap-2.5">
            <span
              aria-hidden="true"
              className="size-[52px] flex-none rounded-[12px] bg-cover bg-center"
              style={{
                backgroundImage: message.poster.src
                  ? `url(${message.poster.src})`
                  : message.poster.placeholder,
              }}
            />
            <span className="flex min-w-0 flex-col gap-0.5">
              <span className="text-[15px] leading-[normal] font-semibold tracking-[-0.01em]">
                {message.title}
              </span>
              <span className="text-xs leading-[normal] text-muted-foreground">{message.when}</span>
              <span className="text-xs leading-[normal] font-semibold text-destructive">
                {message.stock}
              </span>
            </span>
          </div>
          <Button
            variant="ink"
            className="mt-2.5 w-full"
            render={<a href={message.href} />}
            nativeButton={false}
          >
            {message.cta}
          </Button>
        </div>
      ) : (
        <div
          className={cn(
            "max-w-[78%] px-[15px] py-[11px] text-[15px] leading-[1.3]",
            fromSite ? siteRadius : visitorRadius,
            message.kind === "countdown"
              ? "bg-primary text-primary-foreground tabular-nums"
              : fromSite
                ? "bg-pill text-pill-foreground"
                : "bg-ink text-ink-foreground",
          )}
        >
          {message.kind === "countdown"
            ? message.template.replace("{time}", clock)
            : message.text}
        </div>
      )}
    </div>
  );
}

function Typing({
  from,
  brandInitial,
}: {
  from: PulseSender;
  brandInitial: string;
}) {
  const fromSite = from === "site";
  return (
    <div
      className={cn(
        "flex flex-none items-end gap-2",
        fromSite ? "justify-start" : "justify-end",
      )}
    >
      {fromSite && <BrandAvatar initial={brandInitial} />}
      <div
        className={cn(
          "flex gap-[5px] px-4 py-[15px]",
          fromSite ? cn(siteRadius, "bg-pill") : cn(visitorRadius, "bg-ink"),
          "animate-typing-in",
        )}
      >
        {[0, 1, 2].map((i) => (
          <span
            key={i}
            className={cn(
              "size-[7px] rounded-full",
              fromSite ? "bg-muted-foreground" : "bg-ink-foreground",
              "animate-typing-dot",
              i === 1 && "[animation-delay:0.15s]",
              i === 2 && "[animation-delay:0.3s]",
            )}
          />
        ))}
      </div>
    </div>
  );
}
