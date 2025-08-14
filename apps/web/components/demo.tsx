"use client"
import { Cover } from "./ui/cover";
import { motion } from "motion/react"

export default function DemoSection(){
    return (
        <motion.div className="max-w-4xl mx-auto flex flex-col text-center  justify-center"
            initial={{
                y:10,
                opacity:0
            }}
            whileInView={{
                y:0,
                opacity:100
            }}
            animate={{
                transition:{
                    ease:"easeInOut",
                    duration:1000
                }
            }}
        >
            <h1 className="text-xl md:text-3xl font-bold flex items-center gap-2 bg-gradient-to-b from-primary to-[#7a7a7a] bg-clip-text text-transparent mx-auto">See thumbnaily in <Cover>action</Cover></h1>
            <div className="aspect-video p-2">
                <iframe
                    className="w-full h-full rounded-lg"
                    src="https://www.youtube.com/embed/oNlLRvfjcbE"
                    title="Product Demo Video"
                    allow="accelerometer; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                    referrerPolicy="strict-origin-when-cross-origin"
                    allowFullScreen
                ></iframe>
            </div>
        </motion.div>
    );
}