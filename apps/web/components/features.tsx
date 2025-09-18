import {
  Zap,
  Image,
  Wand2,
  Cloud,
  Download,
  Palette,
} from "lucide-react";
import { motion } from "motion/react";
import { MaxWidthWrapper } from "./MaxWidthWrapper";
export default function FeatureSection() {
  const features = [
    {
      icon: Zap,
      title: "Lightning Fast",
      description:
        "Generate stunning thumbnails in seconds with our cutting-edge AI technology.",
    },
    {
      icon: Wand2,
      title: "AI-Powered Magic",
      description:
        "Advanced AI understands your content and creates thumbnails that boost click-through rates.",
    },
    {
      icon: Palette,
      title: "Professional Design",
      description:
        "Get cinema-quality thumbnails with dramatic lighting, perfect composition, and viral appeal.",
    },
    {
      icon: Image,
      title: "Reference Upload",
      description:
        "Upload reference images to guide the AI and create thumbnails that match your vision perfectly.",
    },
    {
      icon: Cloud,
      title: "Cloud Storage",
      description:
        "All your thumbnails are safely stored in the cloud and accessible from anywhere, anytime.",
    },
    {
      icon: Download,
      title: "High Quality Output",
      description:
        "Download thumbnails in high resolution PNG format, optimized for YouTube and social media.",
    },
  ];
  return (
    <MaxWidthWrapper className="py-24 flex flex-col justify-center items-center">
      <h1 className="text-xl md:text-4xl font-bold flex items-center gap-2 bg-gradient-to-b from-primary to-[#7a7a7a] bg-clip-text text-transparent mx-auto">
        Features
      </h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mt-5 ">
        {features.map((feature, index) => (
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: index * 0.15 }}
            viewport={{ once: true, margin: "-250px" }}
            key={index}
            whileHover={{ scale: 1.05, transition: { type: "spring", stiffness: 300 } }}
            className="relative rounded-2xl p-[2px] bg-gradient-to-r from-primary via-purple-500 to-primary"
          >
            <motion.div
              initial={{ opacity: 0 }}
              whileHover={{ opacity: 1 }}
              animate={{ opacity: [0.6, 1, 0.6] }}
              transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
              className="absolute -inset-[2px] rounded-2xl bg-gradient-to-r from-primary via-purple-500 to-primary blur-md opacity-0"
            />

            <div className="relative bg-card border border-border rounded-2xl p-6 transition-all duration-300 hover:shadow-xl hover:shadow-primary/30">
              <div className="bg-primary/10 w-12 h-12 rounded-lg flex items-center justify-center mb-4">
                <feature.icon className="h-6 w-6 text-primary" />
              </div>
              <h3 className="text-xl font-semibold text-foreground mb-2">
                {feature.title}
              </h3>
              <p className="text-muted-foreground">{feature.description}</p>
            </div>
          </motion.div>
        ))}
      </div>
    </MaxWidthWrapper>
  );
}
