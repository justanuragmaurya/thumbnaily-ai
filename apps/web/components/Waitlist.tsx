"use client"
import React, { useRef, useState } from "react";
import { MaxWidthWrapper } from "./MaxWidthWrapper";
import { Instrument_Serif } from "next/font/google";
import { Input } from "./ui/input";
import { ArrowRight, Loader2 } from "lucide-react";
import axios from "axios"

const font = Instrument_Serif({
  subsets: ["latin"],
  weight: "400",
});

function Waitlist() {
    const [loading , setLoading] = useState(false);
    const emailRef = useRef<HTMLInputElement|null>(null);
    const handleClick = async()=>{
        setLoading(true)

        if(!emailRef.current?.value){
            setLoading(false)
            return
        }
        const repsponse = await axios.post("/api/waitlist",{
            email:emailRef.current?.value
        })

        setLoading(false)
    }
  return (
    <MaxWidthWrapper className="flex-1 items-center justify-center text-center h-screen">
    <div className="mt-44">
        <h2 className="">Join the</h2>
        <h2 className={` text-7xl ${font.className} bg-gradient-to-br from-blue-400 to-blue-300 text-transparent bg-clip-text`}>Waitlist</h2>
      </div> 
      <Input type="email"ref={emailRef} className="max-w-xl mx-auto mt-12 py-6 my-6 text-center" placeholder="Enter your email here"/>
      <button disabled={loading} onClick={handleClick} className=" flex text-background items-center gap-2 border border-primary/20 px-6 py-2 rounded-full hover:scale-105 bg-primary hover:bg-background hover:text-primary transition mx-auto disabled:bg-primary/70">{loading?<>Loading <Loader2 className="animate-spin"/></>:<>Join Waitlist <ArrowRight size={15}/></>}</button>
      <h2 className="text-sm mt-4  text-primary/50 "> We promise , we wont spam your mailbox </h2>
    </MaxWidthWrapper>
  );
}

export default Waitlist;