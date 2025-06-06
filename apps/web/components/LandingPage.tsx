import { Instrument_Serif } from "next/font/google";
import Marquee from "@/components/Marquee";
import HeroSection from "@/components/HeroSection";
import { BentoGridSection } from "./BentoGrid";
import DemoSection from "./demo";

export default function LandingPage() {
  return (
    <div className="min-h-screen relative">
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
