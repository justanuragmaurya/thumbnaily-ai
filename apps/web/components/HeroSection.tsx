"use client"
import { Instrument_Serif } from "next/font/google"
import { ArrowRight } from "lucide-react"
import { motion } from "motion/react"
import Link from "next/link"

const InstrumentSerif = Instrument_Serif({
    subsets:["latin"],
    weight:"400",
    style:"italic"
})
export default function HeroSection(){
    return(
        <motion.div 
            className="flex flex-col text-center items-center gap-4 sm:gap-5 mt-20 sm:mt-24 md:mt-32 mb-8 sm:mb-10 px-4 sm:px-6"
            initial={{y:"10%" , opacity: 0}}
            animate={{y:0 , opacity: 100}}
            transition={{ duration: 0.5 , ease:"easeOut"}}
        >   
            <h2 className={`text-2xl sm:text-3xl ${InstrumentSerif.className}`}>Stunning Thumbnails in Seconds.</h2>
            <div className="relative">
                <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold absolute inset-0 -z-10"> 
                    <span className="bg-gradient-to-br from-blue-400 to-blue-300 bg-clip-text text-transparent">Ai Powered</span> 
                    <br />Thumbnail Magic
                </h1>  
                <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold relative z-10"> 
                    <span className="bg-gradient-to-br from-blue-400 to-blue-300 bg-clip-text text-transparent blur-2xl mix-blend-plus-lighter opacity-70 ">Ai Powered</span> 
                    <br />Thumbnail Magic
                </h1>  
            </div>
            <h3 className="max-w-3xl text-base sm:text-lg text-center text-primary/50 mt-2 sm:mt-3">Thumbnail transforms your content with eye-catching thumbnails. Create high-converting thumbnails for videos, and more—no design skills needed.</h3>
            <Link href={"/waitlist"} className="mt-4 sm:mt-6">
                <button className="flex items-center gap-2 border border-primary/20 px-6 sm:px-8 md:px-10 py-3 sm:py-4 rounded-full hover:scale-105 hover:bg-primary hover:text-secondary transition text-sm sm:text-base">
                    Join Waitlist <ArrowRight size={15} className="h-3 w-3 sm:h-4 sm:w-4" />
                </button>
            </Link>
        </motion.div>
    )
}