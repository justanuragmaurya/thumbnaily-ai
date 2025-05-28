import { Instrument_Serif } from "next/font/google";
import { MaxWidthWrapper } from "./MaxWidthWrapper";
import Link from "next/link";

const font = Instrument_Serif({
   subsets: ['latin'],
   weight:"400"
})

export default function Footer(){
    return(
        <div className="border-t">
        <MaxWidthWrapper>
            <div className="w-full py-15 flex items-center justify-between text-primary/70">
                <div>
                    <h1 className={`text-5xl text-primary ${font.className}`}>Thumbnaily</h1>
                    <h2 className="text-sm text-primary/70">Stunning Thumbnails in Seconds.</h2>
               </div>
                <div className="flex-col gap-3 items-end text-md">
                        <Link href={"/privacy-policy"}><h2>Privacy Policy</h2></Link>
                        <Link href={"/terms-and-condition"}><h2>Terms And Condition</h2></Link>
                        <Link href={"/refund-policy"}><h2>Refund Policy</h2></Link>
                </div>
            </div>
        </MaxWidthWrapper>
        </div>

    )
}