import { Instrument_Serif } from "next/font/google";
import Marquee from "@/components/Marquee";
import HeroSection from "@/components/HeroSection";
import { BentoGridSection } from "./BentoGrid";
import DemoSection from "./demo";
import { AnimatedGridPattern } from "./magicui/animated-grid-pattern";
import { cn } from "@/lib/utils";

const InstrumentSerifNotItalics = Instrument_Serif({
  subsets: ["latin"],
  weight: "400",
});

export default function LandingPage() {
  return (
    <div className="min-h-screen relative">
      <AnimatedGridPattern
        numSquares={30}
        opacity={0.3}
        duration={3}
        repeatDelay={1}
        className={cn(
          "[mask-image:radial-gradient(500px_circle_at_center,white,transparent)]",
          "inset-x-0 inset-y-[-30%] skew-y-12"
        )}
      />
      <section>
        <HeroSection />
      </section>
      <section className="flex flex-col items-center">
        <Marquee />
      </section>
      <section className="py-12 my-12">
        <DemoSection />
      </section>
      <section className="mt-8">
        <BentoGridSection />
      </section>
    </div>
  );
}
