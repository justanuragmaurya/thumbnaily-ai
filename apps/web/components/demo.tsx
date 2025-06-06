import { Instrument_Serif } from "next/font/google";
import { Cover } from "./ui/cover";

const font = Instrument_Serif({
    subsets:['latin'],
    weight:"400"
})

export default function DemoSection(){
    return (
        <div className="max-w-4xl mx-auto flex flex-col text-center  justify-center">
            <h1 className="text-xl md:text-3xl font-bold flex items-center gap-2 bg-gradient-to-b from-primary to-[#7a7a7a] bg-clip-text text-transparent mx-auto">See thumbnaily in <Cover>action</Cover></h1>
            <div className="aspect-video p-2">
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