import { Instrument_Serif } from "next/font/google"
import Marquee from "@/components/Marquee"
import BentoGrid from "@/components/BentoGrid"
import HeroSection from "@/components/HeroSection"
import ShowcaseSection from "./showcase"

const InstrumentSerifNotItalics = Instrument_Serif({
    subsets:["latin"],
    weight:"400",
})

export default function LandingPage(){
    return(
        <div>
            <section>
                <HeroSection/>
            </section>
            <section className="flex flex-col items-center">
                <Marquee/>
            </section>
            {/* <section className="">
                <BentoGrid/>
            </section>
            <section className="">
                <ShowcaseSection/>
            </section> */}
        </div>
    )
}