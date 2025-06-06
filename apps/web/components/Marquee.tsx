"use client";
import React, { useState } from "react";
import { motion, useAnimation } from "motion/react";
import Image from "next/image";
import { MaxWidthWrapper } from "./MaxWidthWrapper";

export default function Marquee() {
  const [isPaused, setIsPaused] = useState(false);
  const controls1 = useAnimation();
  const controls2 = useAnimation();
  
  const image = [
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

  // Start animations on component mount
  React.useEffect(() => {
    if (!isPaused) {
      controls1.start({
        x: "-100%",
        transition: { duration: 40, repeat: Infinity, ease: "linear" }
      });
      controls2.start({
        x: "-100%",
        transition: { duration: 40, repeat: Infinity, ease: "linear" }
      });
    } else {
      // Pause animations by stopping at current position
      controls1.stop();
      controls2.stop();
    }
  }, [isPaused, controls1, controls2]);

  return (
    <MaxWidthWrapper>
      <motion.div
        className="overflow-hidden relative"
        initial={{ opacity: 0}}
        animate={{ opacity: 100}}
        transition={{delay:0.5 , duration: 1.5 , ease:"easeOut"}}
      >
        <div className="absolute top-0 bottom-0 left-0 bg-gradient-to-r from-background to-transparent z-10 w-16 sm:w-24 md:w-32 pointer-events-none" />
        <div className="absolute top-0 bottom-0 right-0 bg-gradient-to-l from-background to-transparent z-10 w-24 sm:w-32 md:w-48 pointer-events-none" />
        
        <div className="flex"
             onMouseEnter={() => setIsPaused(true)}
             onMouseLeave={() => setIsPaused(false)}
        >
          <motion.div
            initial={{ x: 0 }}
            animate={controls1}
            className="flex flex-shrink-0 justify-start"
          >
            {image.map((image, index) => {
              return (
                <div key={index} className="relative m-1 sm:m-2 md:m-3 group">
                  <Image
                    className="w-48 sm:w-64 md:w-80 lg:w-96 rounded-lg md:rounded-xl relative z-0 transition-transform duration-300 hover:-translate-y-2 md:hover:-translate-y-3"
                    width={1920}
                    height={1080}
                    src={`/${image}`}  
                    alt={`Image ${index + 1}`}
                  />
                </div>
              );
            })}
          </motion.div>
          <motion.div
            initial={{ x: 0 }}
            animate={controls2}
            className="pl-1 sm:pl-2 md:pl-3 flex flex-shrink-0 justify-start"
          >
            {image.map((image, index) => {
              return (
                <div key={index} className="relative m-1 sm:m-2 md:m-3 group">
                  <Image
                    className="w-48 sm:w-64 md:w-80 lg:w-96 rounded-lg md:rounded-xl relative z-0 transition-transform duration-300 hover:-translate-y-1"
                    width={1920}
                    height={1080}
                    src={`/${image}`}
                    alt={`Image ${index + 1}`}
                  />
                </div>
              );
            })}
          </motion.div>
        </div>
      </motion.div>
      </MaxWidthWrapper>
  );
}