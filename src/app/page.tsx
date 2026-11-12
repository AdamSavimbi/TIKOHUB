import { Pulse } from "@/components/landing/pulse";
import { pulseContent } from "@/lib/mock/pulse";

export default function Home() {
  return (
    <main className="flex flex-1 flex-col">
      <Pulse content={pulseContent} />
    </main>
  );
}
