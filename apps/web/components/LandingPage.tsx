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

const fallbackRow1 = [
  "/1.jpeg",
  "/2.jpeg",
  "/3.jpeg",
  "/4.jpeg",
  "/5.jpeg",
  "/6.jpeg",
];

const fallbackRow2 = [
  "/7.jpeg",
  "/9.jpeg",
  "/10.jpeg",
  "/11.jpeg",
  "/12.jpeg",
  "/13.jpeg",
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

interface LandingPageProps {
  thumbnailUrls?: string[];
}

export default function LandingPage({ thumbnailUrls = [] }: LandingPageProps) {
  const hasDbThumbnails = thumbnailUrls.length >= 12;
  const row1 = hasDbThumbnails ? thumbnailUrls.slice(0, 6) : fallbackRow1;
  const row2 = hasDbThumbnails ? thumbnailUrls.slice(6, 12) : fallbackRow2;

  return (
    <div className="min-h-screen">
      {/* ── Hero ── */}
      <section className="relative min-h-[100dvh] flex items-center pt-20 pb-12 lg:pt-16 lg:pb-0 overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_50%_at_50%_100%,rgba(220,38,38,0.08),transparent)] -z-10" />

        <div className="w-full lg:grid lg:grid-cols-[3fr_2fr] items-center">
            {/* Left — copy */}
            <motion.div
              className="px-5 sm:px-6 lg:pl-[max(1.5rem,calc((100vw-72rem)/2+1.5rem))] lg:pr-8"
              variants={stagger}
              initial="hidden"
              animate="visible"
            >
              <motion.div
                variants={fadeUp}
                className="inline-flex items-center gap-2 sm:gap-3 text-[0.65rem] sm:text-xs font-medium tracking-[0.15em] sm:tracking-[0.2em] uppercase text-red-500 mb-5 sm:mb-8"
              >
                <span className="w-5 sm:w-8 h-px bg-red-500/60" />
                Open-Source &amp; AI-Powered
                <span className="w-5 sm:w-8 h-px bg-red-500/60" />
              </motion.div>

              <motion.h1
                variants={fadeUp}
                className={`text-[2.5rem] leading-[1.05] sm:text-5xl md:text-6xl lg:text-7xl font-bold tracking-tight whitespace-nowrap sm:leading-[1] ${sora.className}`}
              >
                Thumbnails that
                <br />
                <span className="text-red-500">sell themselves.</span>
              </motion.h1>

              <motion.p
                variants={fadeUp}
                className="mt-5 sm:mt-6 md:mt-8 text-sm sm:text-base md:text-lg text-muted-foreground/90 max-w-md leading-relaxed"
              >
                Type what your video is about. Get click-worthy,
                studio-quality thumbnails in seconds — no design tools, no
                templates, no creative block. Free and open-source.
              </motion.p>

              <motion.div
                variants={fadeUp}
                className="mt-7 sm:mt-10 md:mt-12 flex flex-col sm:flex-row items-start gap-3 sm:gap-4"
              >
                <Link
                  href="/app"
                  className="group inline-flex items-center gap-2 bg-red-600 hover:bg-red-700 text-white font-medium px-7 py-3 sm:px-8 sm:py-3.5 rounded-xl transition-all duration-200 text-sm sm:text-base"
                >
                  Create your first thumbnail
                  <ArrowRight
                    size={16}
                    className="group-hover:translate-x-0.5 transition-transform"
                  />
                </Link>
                <a
                  href="#demo"
                  className="text-sm text-muted-foreground hover:text-foreground transition-colors underline underline-offset-4 decoration-muted-foreground/30 hover:decoration-foreground/50 py-3"
                >
                  Watch the demo
                </a>
              </motion.div>
            </motion.div>

            {/* Right — dual carousel */}
            <motion.div
              className="overflow-hidden h-[340px] sm:h-[400px] lg:h-[480px]"
              initial={{ opacity: 0, x: 40 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.3, ease: [0.25, 0.1, 0.25, 1] }}
            >
              <div className="flex flex-col justify-center gap-4 sm:gap-5 h-full">
                {/* Row 1 — left to right */}
                <div className="relative overflow-hidden">
                  <div className="absolute inset-y-0 left-0 w-20 bg-gradient-to-r from-background via-background/70 to-transparent z-10 pointer-events-none" />
                  <div className="absolute inset-y-0 right-0 w-20 bg-gradient-to-l from-background via-background/70 to-transparent z-10 pointer-events-none" />
                  <div className="carousel-ltr">
                    {[...row1, ...row1, ...row1].map((src, i) => (
                      <Image
                        key={`ltr-${i}`}
                        src={src}
                        alt="Generated thumbnail"
                        width={280}
                        height={158}
                        className="w-44 sm:w-52 lg:w-60 aspect-video rounded-xl object-cover mx-2 shrink-0 hover:scale-105 transition-transform duration-300"
                      />
                    ))}
                  </div>
                </div>

                {/* Row 2 — right to left */}
                <div className="relative overflow-hidden">
                  <div className="absolute inset-y-0 left-0 w-20 bg-gradient-to-r from-background via-background/70 to-transparent z-10 pointer-events-none" />
                  <div className="absolute inset-y-0 right-0 w-20 bg-gradient-to-l from-background via-background/70 to-transparent z-10 pointer-events-none" />
                  <div className="carousel-rtl">
                    {[...row2, ...row2, ...row2].map((src, i) => (
                      <Image
                        key={`rtl-${i}`}
                        src={src}
                        alt="Generated thumbnail"
                        width={280}
                        height={158}
                        className="w-44 sm:w-52 lg:w-60 aspect-video rounded-xl object-cover mx-2 shrink-0 hover:scale-105 transition-transform duration-300"
                      />
                    ))}
                  </div>
                </div>
              </div>
            </motion.div>
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
              <video
                className="w-full h-full object-cover"
                src="https://pub-1032861f0f60406f96a2712bc9e02197.r2.dev/assests/demo-1773767336046.mp4"
                autoPlay
                muted
                loop
                playsInline
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
