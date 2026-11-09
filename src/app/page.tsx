import { Pulse } from "@/components/landing/pulse";
import { pulseContent } from "@/lib/mock/pulse";

export default function Home() {
  return (
    <main className="flex flex-1 flex-col">
      {/* Placeholder hero: replaced when the hero section is built from design/draft_1/Main.dc.html. */}
      <section
        aria-label="Hero placeholder"
        className="px-4 pt-[30px] pb-6 md:px-[clamp(16px,3.4vw,48px)]"
      >
        <div className="mx-auto w-full max-w-(--breakpoint-2xl)">
          <h1 className="headline text-[72px] leading-[0.94] tracking-[-0.05em]">
            TikoPoa
          </h1>
        </div>
      </section>

      <Pulse content={pulseContent} />
    </main>
  );
}
