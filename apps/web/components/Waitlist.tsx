"use client"
import React, { useRef, useState } from "react";
import { MaxWidthWrapper } from "./MaxWidthWrapper";
import { Instrument_Serif } from "next/font/google";
import { Input } from "./ui/input";
import { ArrowRight, Loader2 } from "lucide-react";
import axios from "axios"
import { useRouter } from "next/navigation";
import { toast } from "sonner";

const font = Instrument_Serif({
  subsets: ["latin"],
  weight: "400",
});

function Waitlist() {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const emailRef = useRef<HTMLInputElement|null>(null);
    const router = useRouter()

    const validateEmail = (email: string): boolean => {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    }

    const handleClick = async() => {
        setLoading(true)
        setError(null)

        if(!emailRef.current?.value){
            setError("Please enter an email address");
            setLoading(false)
            return
        }

        const email = emailRef.current.value;
        
        if(!validateEmail(email)) {
            setError("Please enter a valid email address");
            setLoading(false)
            return
        }

        try {
            const response = await axios.post("/api/waitlist", {
                email: email
            })

            if(response.status === 200){
                toast("Added to waitlist", {
                    description: "Have a check on your mailbox, we'll mail as soon as we launch.",
                })
                router.push("/")
            }
        } catch (err) {
            toast("Error", {
                description: "Something went wrong. Please try again.",
            })
            console.error(err)
        } finally {
            setLoading(false)
        }
    }

  return (
    <MaxWidthWrapper className="flex-1 items-center justify-center text-center min-h-[calc(100vh-80px)] py-8 sm:py-12">
      <div className="mt-20 sm:mt-28 md:mt-32 lg:mt-44">
        <h2 className="text-lg sm:text-xl">Join the</h2>
        <h2 className={`text-4xl sm:text-5xl md:text-6xl lg:text-7xl ${font.className} bg-gradient-to-br from-blue-400 to-blue-300 text-transparent bg-clip-text`}>Waitlist</h2>
      </div> 
      <Input 
        type="email"
        ref={emailRef}
        className="max-w-xs sm:max-w-sm md:max-w-md lg:max-w-xl mx-auto mt-6 sm:mt-8 md:mt-12 py-4 sm:py-6 my-6 text-center" 
        placeholder="Enter your email here"
        onChange={() => setError(null)}
      />
      {error && <p className="text-red-500 text-sm -mt-3 mb-4">{error}</p>}
      <button 
        disabled={loading} 
        onClick={handleClick} 
        className="flex text-background items-center gap-2 border border-primary/20 px-4 sm:px-6 py-2 rounded-full hover:scale-105 bg-primary hover:bg-background hover:text-primary transition mx-auto disabled:bg-primary/70">
          {loading ? 
            <>Loading <Loader2 className="ml-1 h-4 w-4 animate-spin"/></> : 
            <>Join Waitlist <ArrowRight className="h-3 w-3 sm:h-4 sm:w-4"/></>
          }
      </button>
      <h2 className="text-xs sm:text-sm mt-4 text-primary/50">We promise, we won&apos;t spam your mailbox</h2>
    </MaxWidthWrapper>
  );
}

export default Waitlist;