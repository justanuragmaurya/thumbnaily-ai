"use client";
import { Instrument_Serif } from "next/font/google";
import { ArrowRight } from "lucide-react";
import { motion } from "motion/react";
import Link from "next/link";
import { RainbowButton } from "@/components/magicui/rainbow-button";
import { AuroraText } from "@/components/magicui/aurora-text";

const font = Instrument_Serif({
  subsets: ["latin"],
  weight: "400",
  style: "italic",
});
export default function HeroSection() {
  return (
    <div>
      <motion.div
        className="flex flex-col text-center items-center gap-4 sm:gap-5 mt-6 md:mt-12 mb-8 sm:mb-10 px-4 sm:px-6"
        initial={{ y: "10%", opacity: 0 }}
        animate={{ y: 0, opacity: 100 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
      > 
        <h1 className={`${font.className} text-sm md:text-2xl`}>Stuning thumbnails in seconds</h1>
        <div className="relative">
          <h1 className="text-3xl sm:text-5xl md:text-6xl lg:text-7xl font-bold relative z-10">
            <AuroraText colors={["#7ce8ff","#55d0ff","#00acdf"]}>
              Ai Powered
            </AuroraText>
            <br />{" "}
            <span className="bg-gradient-to-b from-primary to-[#7a7a7a] bg-clip-text text-transparent">
              Thumbnail Magic
            </span>
          </h1>
        </div>
        <h3 className="max-w-3xl text-xs md:text-lg text-center text-primary/50 mt-2 sm:mt-3">
          Thumbnaily is open source tool transforms your content with eye-catching thumbnails. Create high-converting thumbnails for videos, and more—no design skills needed.
        </h3>
        <Link href={"/app"} className="mt-4 sm:mt-6 z-50">
          <RainbowButton className="flex cursor-pointer items-center gap-2 border border-primary/20 px-4 md:px-10 hover:scale-105 transition text-sm sm:text-base h-8 md:h-12">
            Generate Now
            <ArrowRight size={15} className="h-3 w-3 sm:h-4 sm:w-4" />
          </RainbowButton>
        </Link>
      </motion.div>
    </div>
  );
}
