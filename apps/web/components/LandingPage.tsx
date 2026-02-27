"use client";
import { motion } from "motion/react";
import { Sora } from "next/font/google";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Sparkles, Zap, Palette, Github } from "lucide-react";
import { MaxWidthWrapper } from "./MaxWidthWrapper";

const sora = Sora({
  subsets: ["latin"],
  weight: ["400", "600", "700"],
});

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: [0.25, 0.1, 0.25, 1] },
  },
};

const stagger = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.12 } },
};

const thumbnails = [
  "1.jpeg",
  "2.jpeg",
  "3.jpeg",
  "4.jpeg",
  "5.jpeg",
  "6.jpeg",
  "7.jpeg",
  "9.jpeg",
  "10.jpeg",
  "11.jpeg",
  "12.jpeg",
  "13.jpeg",
];

const steps = [
  {
    number: "01",
    title: "Describe",
    description:
      "Tell us what you need — a gaming thumbnail, a cooking vlog cover, a tech review visual. Just describe it in plain English.",
  },
  {
    number: "02",
    title: "Generate",
    description:
      "Our AI creates multiple high-quality thumbnail options tailored to your description. Pick the one that fits.",
  },
  {
    number: "03",
    title: "Publish",
    description:
      "Download in full resolution and upload directly to YouTube, your blog, or any social platform.",
  },
];

const features = [
  {
    icon: <Sparkles className="w-5 h-5" />,
    title: "Context-Aware AI",
    description:
      "Trained on high-performing thumbnails across niches. It understands what drives clicks in your space.",
  },
  {
    icon: <Zap className="w-5 h-5" />,
    title: "Seconds, Not Hours",
    description:
      "Go from idea to finished thumbnail in under 30 seconds. No Photoshop. No Canva. No templates.",
  },
  {
    icon: <Palette className="w-5 h-5" />,
    title: "Zero Design Skills",
    description:
      "If you can write a sentence, you can create a professional thumbnail. Seriously, it's that simple.",
  },
  {
    icon: <Github className="w-5 h-5" />,
    title: "Open Source",
    description:
      "Fully transparent and community-driven. Inspect the code, self-host, or use our managed cloud.",
  },
];

export default function LandingPage() {
  return (
    <div className="min-h-screen">
      {/* ── Hero ── */}
      <section className="relative min-h-[100dvh] flex items-center justify-center pt-16 overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_50%_at_50%_100%,rgba(220,38,38,0.08),transparent)] -z-10" />

        <MaxWidthWrapper className="px-5 sm:px-6">
          <motion.div
            className="text-center max-w-3xl mx-auto"
            variants={stagger}
            initial="hidden"
            animate="visible"
          >
            <motion.div
              variants={fadeUp}
              className="inline-flex items-center gap-2 sm:gap-3 text-[0.65rem] sm:text-xs font-medium tracking-[0.15em] sm:tracking-[0.2em] uppercase text-red-500 mb-5 sm:mb-8"
            >
              <span className="w-5 sm:w-8 h-px bg-red-500/60" />
              AI-Powered Generation
              <span className="w-5 sm:w-8 h-px bg-red-500/60" />
            </motion.div>

            <motion.h1
              variants={fadeUp}
              className={`text-[2.5rem] leading-[1] sm:text-6xl md:text-7xl lg:text-8xl font-bold tracking-tight sm:leading-[0.95] ${sora.className}`}
            >
              Stop designing
              <br />
              <span className="text-red-500">thumbnails.</span>
            </motion.h1>

            <motion.p
              variants={fadeUp}
              className="mt-5 sm:mt-6 md:mt-8 text-sm sm:text-base md:text-xl text-muted-foreground max-w-xl mx-auto leading-relaxed"
            >
              Let AI handle the pixels. You handle the content. Generate
              scroll-stopping thumbnails in seconds with nothing but a text
              prompt.
            </motion.p>

            <motion.div
              variants={fadeUp}
              className="mt-7 sm:mt-10 md:mt-12 flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-4"
            >
              <Link
                href="/app"
                className="group inline-flex items-center gap-2 bg-red-600 hover:bg-red-700 text-white font-medium px-7 py-3 sm:px-8 sm:py-3.5 rounded-xl transition-all duration-200 text-sm sm:text-base"
              >
                Start generating
                <ArrowRight
                  size={16}
                  className="group-hover:translate-x-0.5 transition-transform"
                />
              </Link>
              <a
                href="#demo"
                className="text-sm text-muted-foreground hover:text-foreground transition-colors underline underline-offset-4 decoration-muted-foreground/30 hover:decoration-foreground/50"
              >
                See it in action
              </a>
            </motion.div>
          </motion.div>
        </MaxWidthWrapper>
      </section>

      {/* ── Thumbnail Marquee ── */}
      <section className="py-4 sm:py-6 overflow-hidden border-y border-border/50 relative">
        <div className="absolute left-0 top-0 bottom-0 w-16 sm:w-24 md:w-40 bg-gradient-to-r from-background to-transparent z-10 pointer-events-none" />
        <div className="absolute right-0 top-0 bottom-0 w-16 sm:w-24 md:w-40 bg-gradient-to-l from-background to-transparent z-10 pointer-events-none" />

        <div className="marquee-track">
          {[...thumbnails, ...thumbnails].map((img, i) => (
            <Image
              key={i}
              src={`/${img}`}
              alt="Generated thumbnail"
              width={320}
              height={180}
              className="w-40 sm:w-56 md:w-72 rounded-lg object-cover mx-1.5 sm:mx-2 opacity-50 hover:opacity-100 transition-opacity duration-300"
            />
          ))}
        </div>
      </section>

      {/* ── How It Works ── */}
      <section className="py-14 sm:py-20 md:py-32">
        <MaxWidthWrapper className="px-5 sm:px-6">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-60px" }}
            variants={stagger}
          >
            <motion.div
              variants={fadeUp}
              className="text-center mb-10 sm:mb-14 md:mb-20"
            >
              <div className="inline-flex items-center gap-2 sm:gap-3 text-[0.65rem] sm:text-xs font-medium tracking-[0.15em] sm:tracking-[0.2em] uppercase text-red-500 mb-3 sm:mb-4">
                <span className="w-5 sm:w-8 h-px bg-red-500/60" />
                How it works
                <span className="w-5 sm:w-8 h-px bg-red-500/60" />
              </div>
              <h2
                className={`text-2xl sm:text-3xl md:text-5xl font-bold tracking-tight ${sora.className}`}
              >
                Three steps. Zero design skills.
              </h2>
            </motion.div>

            <div className="grid md:grid-cols-3 gap-8 md:gap-16">
              {steps.map((step) => (
                <motion.div
                  key={step.number}
                  variants={fadeUp}
                  className="relative"
                >
                  <span
                    className={`block text-5xl sm:text-6xl md:text-7xl font-bold text-red-600/10 leading-none ${sora.className}`}
                  >
                    {step.number}
                  </span>
                  <h3
                    className={`text-lg sm:text-xl font-semibold mt-2 sm:mt-3 ${sora.className}`}
                  >
                    {step.title}
                  </h3>
                  <p className="text-sm sm:text-base text-muted-foreground mt-2 sm:mt-3 leading-relaxed">
                    {step.description}
                  </p>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </MaxWidthWrapper>
      </section>

      {/* ── Features ── */}
      <section className="py-14 sm:py-20 md:py-32 border-t border-border/50">
        <MaxWidthWrapper className="px-5 sm:px-6">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-60px" }}
            variants={stagger}
          >
            <motion.div
              variants={fadeUp}
              className="text-center mb-10 sm:mb-14 md:mb-20"
            >
              <div className="inline-flex items-center gap-2 sm:gap-3 text-[0.65rem] sm:text-xs font-medium tracking-[0.15em] sm:tracking-[0.2em] uppercase text-red-500 mb-3 sm:mb-4">
                <span className="w-5 sm:w-8 h-px bg-red-500/60" />
                Features
                <span className="w-5 sm:w-8 h-px bg-red-500/60" />
              </div>
              <h2
                className={`text-2xl sm:text-3xl md:text-5xl font-bold tracking-tight ${sora.className}`}
              >
                Built for creators who move fast.
              </h2>
            </motion.div>

            <div className="grid sm:grid-cols-2 gap-3 sm:gap-5">
              {features.map((feature) => (
                <motion.div
                  key={feature.title}
                  variants={fadeUp}
                  className="group p-5 sm:p-7 md:p-8 rounded-xl sm:rounded-2xl border border-border/50 hover:border-red-600/20 bg-card/30 transition-colors duration-300"
                >
                  <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-lg bg-red-600/10 flex items-center justify-center text-red-500 mb-4 sm:mb-5">
                    {feature.icon}
                  </div>
                  <h3
                    className={`text-base sm:text-lg font-semibold ${sora.className}`}
                  >
                    {feature.title}
                  </h3>
                  <p className="text-sm sm:text-base text-muted-foreground mt-1.5 sm:mt-2 leading-relaxed">
                    {feature.description}
                  </p>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </MaxWidthWrapper>
      </section>

      {/* ── Demo ── */}
      <section id="demo" className="py-14 sm:py-20 md:py-32 border-t border-border/50">
        <MaxWidthWrapper className="px-5 sm:px-6">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-60px" }}
            variants={stagger}
          >
            <motion.div
              variants={fadeUp}
              className="text-center mb-8 sm:mb-12 md:mb-16"
            >
              <div className="inline-flex items-center gap-2 sm:gap-3 text-[0.65rem] sm:text-xs font-medium tracking-[0.15em] sm:tracking-[0.2em] uppercase text-red-500 mb-3 sm:mb-4">
                <span className="w-5 sm:w-8 h-px bg-red-500/60" />
                Demo
                <span className="w-5 sm:w-8 h-px bg-red-500/60" />
              </div>
              <h2
                className={`text-2xl sm:text-3xl md:text-5xl font-bold tracking-tight ${sora.className}`}
              >
                See it in action.
              </h2>
            </motion.div>

            <motion.div
              variants={fadeUp}
              className="max-w-4xl mx-auto aspect-video rounded-xl sm:rounded-2xl overflow-hidden border border-border/50"
            >
              <iframe
                className="w-full h-full"
                src="https://www.youtube.com/embed/oNlLRvfjcbE"
                title="Product Demo Video"
                allow="accelerometer; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                referrerPolicy="strict-origin-when-cross-origin"
                allowFullScreen
              />
            </motion.div>
          </motion.div>
        </MaxWidthWrapper>
      </section>

      {/* ── CTA ── */}
      <section className="py-14 sm:py-20 md:py-32 border-t border-border/50 relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_60%_50%_at_50%_110%,rgba(220,38,38,0.06),transparent)]" />

        <MaxWidthWrapper className="px-5 sm:px-6">
          <motion.div
            className="text-center max-w-2xl mx-auto relative"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-60px" }}
            variants={stagger}
          >
            <motion.h2
              variants={fadeUp}
              className={`text-2xl sm:text-3xl md:text-5xl font-bold tracking-tight leading-tight ${sora.className}`}
            >
              Ready to stop wasting time
              <br />
              on thumbnails?
            </motion.h2>
            <motion.p
              variants={fadeUp}
              className="mt-4 sm:mt-6 text-sm sm:text-base md:text-lg text-muted-foreground"
            >
              Join creators who&apos;ve already made the switch. Your first
              thumbnails are on us.
            </motion.p>
            <motion.div
              variants={fadeUp}
              className="mt-7 sm:mt-10 flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-4"
            >
              <Link
                href="/app"
                className="group inline-flex items-center gap-2 bg-red-600 hover:bg-red-700 text-white font-medium px-7 py-3 sm:px-8 sm:py-3.5 rounded-xl transition-all duration-200 text-sm sm:text-base"
              >
                Get started free
                <ArrowRight
                  size={16}
                  className="group-hover:translate-x-0.5 transition-transform"
                />
              </Link>
              <Link
                href="/pricing"
                className="text-sm text-muted-foreground hover:text-foreground transition-colors underline underline-offset-4 decoration-muted-foreground/30 hover:decoration-foreground/50"
              >
                View pricing
              </Link>
            </motion.div>
          </motion.div>
        </MaxWidthWrapper>
      </section>
    </div>
  );
}
