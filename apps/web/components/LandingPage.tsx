"use client";
import { motion } from "motion/react";
import Marquee from "@/components/Marquee";
import HeroSection from "@/components/HeroSection";
import { BentoGridSection } from "./BentoGrid";
import DemoSection from "./demo";
import { StarsBackground } from "./ui/star-background";
import { ShootingStars } from "./ui/shooting-star";
import FeatureSection from "./features";

export default function LandingPage() {
  const gradient = [
    "radial-gradient(200% 125% at 50% 0%, transparent 45%, #DD335C)",
    "radial-gradient(200% 125% at 50% 0%, transparent 35%, #9333EA)",
    "radial-gradient(200% 125% at 50% 0%, transparent 40%, #3B82F6)",
    "radial-gradient(200% 125% at 50% 0%, transparent 50%, #10B981)",
    "radial-gradient(200% 125% at 50% 0%, transparent 45%, #F59E0B)",
    "radial-gradient(200% 125% at 50% 0%, transparent 45%, #DD335C)",
  ];

  return (
    <div className="min-h-screen relative">
      <motion.div
        className="py-24 h-screen relative overflow-hidden"
        animate={{
          background: gradient,
        }}
        transition={{
          duration: 8,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      >
        <section>
          <HeroSection />
        </section>
        <section className="flex flex-col items-center">
          <Marquee />
        </section>
        <StarsBackground/>
        <ShootingStars/>
      </motion.div>
      <section>
        <FeatureSection/>
      </section>
      <section className="py-12">
        <DemoSection />
      </section>
      <section className="mt-8">
        <BentoGridSection />
      </section>
    </div>
  );
}
