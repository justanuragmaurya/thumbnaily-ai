import React from 'react'
import { MaxWidthWrapper } from '@/components/MaxWidthWrapper'
import { Instrument_Serif } from 'next/font/google'
import { ModeToggle } from './ModeToggle'
import { ArrowRight } from 'lucide-react'
import Link from 'next/link'

const InstrumentSerif = Instrument_Serif({
    subsets:["latin"],
    weight:"400",
    style:"italic"
})

function Navbar() {
  return (
    <MaxWidthWrapper>
      <div className='flex p-5 items-center justify-between'>
        <Link href={"/"}><div className={`font-bold text-2xl ${InstrumentSerif.className}`}>
            Thumbnaily
        </div>
        </Link> 
        <div className='flex gap-8'>
            <a href='#' className='text-sm hover:text-black cursor-pointer transition'>Home</a>
            <a href='#' className='text-sm hover:text-black cursor-pointer transition'>Services</a>
            <a href='#' className='text-sm hover:text-black cursor-pointer transition'>Features</a>
            <a href='#' className='text-sm hover:text-black cursor-pointer transition'>Pricing</a>
        </div>
        <div className='flex gap-2'>
          <ModeToggle/>
          <button className=" flex items-center gap-2 border border-primary/20 px-8 py-2 rounded-full hover:bg-primary hover:text-secondary transition text-sm">Get Started <ArrowRight size={15}/></button>
        </div>
      </div>

    </MaxWidthWrapper>
  )
}

export default Navbar