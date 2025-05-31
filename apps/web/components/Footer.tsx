import { Instrument_Serif } from "next/font/google";
import { MaxWidthWrapper } from "./MaxWidthWrapper";
import Link from "next/link";

const font = Instrument_Serif({
   subsets: ['latin'],
   weight:"400"
})

export default function Footer(){
    return(
        <div className="border-t mt-10 sm:mt-16">
        <MaxWidthWrapper>
            <div className="w-full py-6 sm:py-10 md:py-15 flex flex-col sm:flex-row gap-6 sm:gap-0 items-center sm:items-start sm:justify-between text-primary/70">
                {/* Logo and tagline */}
                <div className="text-center sm:text-left">
                    <h1 className={`text-3xl sm:text-4xl md:text-5xl text-primary ${font.className}`}>Thumbnaily</h1>
                    <h2 className="text-xs sm:text-sm text-primary/70 mt-1">Stunning Thumbnails in Seconds.</h2>
               </div>
               
                {/* Links */}
                <div className="flex flex-col gap-2 sm:gap-3 items-center sm:items-end text-sm md:text-md">
                    <Link href={"/privacy-policy"} className="hover:underline">
                        <h2>Privacy Policy</h2>
                    </Link>
                    <Link href={"/terms-and-condition"} className="hover:underline">
                        <h2>Terms And Condition</h2>
                    </Link>
                    <Link href={"/refund-policy"} className="hover:underline">
                        <h2>Refund Policy</h2>
                    </Link>
                </div>
            </div>
            
            {/* Copyright */}
            <div className="text-center text-xs text-primary/50 pb-4 sm:pb-6">
                © {new Date().getFullYear()} Thumbnaily. All rights reserved.
            </div>
        </MaxWidthWrapper>
        </div>
    )
}