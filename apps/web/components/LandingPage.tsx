import { Instrument_Serif } from "next/font/google"
import Marquee from "@/components/Marquee"
import HeroSection from "@/components/HeroSection"
import { WobbleCardDemo } from "./BentoGrid"

const InstrumentSerifNotItalics = Instrument_Serif({
    subsets:["latin"],
    weight:"400",
})

export default function LandingPage(){
    return(
        <div className="min-h-screen">
            <section>
                <HeroSection/>
            </section>
            <section className="flex flex-col items-center">
                <Marquee/>
            </section>
            <section className="mt-32 p-5">
                <WobbleCardDemo/>
            </section>
        </div>
    )
}