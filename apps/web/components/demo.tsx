import { Instrument_Serif } from "next/font/google";
import { Cover } from "./ui/cover";
import { ArrowBigDown, ArrowDownNarrowWideIcon } from "lucide-react";

const font = Instrument_Serif({
    subsets:['latin'],
    weight:"400"
})

export default function DemoSection(){
    return (
        <div className="max-w-4xl mx-auto">
            <div className="flex items-center w-full justify-center mb-2">
                <h1 className="text-3xl font-bold flex items-center gap-2 bg-gradient-to-b from-primary to-[#7a7a7a] bg-clip-text text-transparent">See thumbnaily in <Cover>action</Cover> <ArrowBigDown size={40} /> </h1>
            </div>
            <div className="aspect-video">
                <iframe
                    className="w-full h-full rounded-lg"
                    src="https://www.youtube.com/embed/dQw4w9WgXcQ"
                    title="Product Demo Video"
                    allow="accelerometer; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                    referrerPolicy="strict-origin-when-cross-origin"
                    allowFullScreen
                ></iframe>
            </div>
        </div>
    );
}