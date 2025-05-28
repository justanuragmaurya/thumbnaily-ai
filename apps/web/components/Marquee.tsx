"use client";
import React from "react";
import { motion } from "motion/react";

export default function Marquee() {
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

  return (
    <>
      <motion.div
        className="overflow-hidden relative"
        initial={{ opacity: 0}}
        animate={{ opacity: 100}}
        transition={{delay:0.5 , duration: 1.5 , ease:"easeOut"}}
      >
        <div className="absolute top-0 bottom-0 left-0 bg-gradient-to-r from-background to-transparent z-10 w-32 pointer-events-none" />
        <div className="absolute top-0 bottom-0 right-0 bg-gradient-to-l from-background to-transparent z-10 w-48 pointer-events-none" />
        
        <div className="flex">
          <motion.div
            initial={{ x: 0 }}
            animate={{ x: "-100%" }}
            transition={{ duration: 40, repeat: Infinity, ease: "linear" }}
            className="flex flex-shrink-0 justify-start"
          >
            {image.map((image, index) => {
              return (
                <div key={index} className="relative m-3 group">
                  <img
                    className="w-96 rounded-xl relative z-0 transition-transform duration-300 group-hover:scale-[1.02]"
                    src={`./${image}`}  
                    alt={`Image ${index + 1}`}
                  />
                </div>
              );
            })}
          </motion.div>
          <motion.div
            initial={{ x: 0 }}
            animate={{ x: "-100%" }}
            transition={{ duration: 40, repeat: Infinity, ease: "linear" }}
            className="pl-3 flex flex-shrink-0 justify-start"
          >
            {image.map((image, index) => {
              return (
                <div key={index} className="relative m-3 group">
                  <img
                    className="w-96 rounded-xl relative z-0 transition-transform duration-300 group-hover:scale-[1.02]"
                    src={`./${image}`}
                    alt={`Image ${index + 1}`}
                  />
                </div>
              );
            })}
          </motion.div>
        </div>
      </motion.div>
    </>
  );
}
