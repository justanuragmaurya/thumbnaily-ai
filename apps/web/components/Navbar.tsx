"use client"
import React, { useState } from 'react'
import { MaxWidthWrapper } from '@/components/MaxWidthWrapper'
import { Instrument_Serif } from 'next/font/google'
import { ModeToggle } from './ModeToggle'
import { ArrowRight, Menu, X } from 'lucide-react'
import Link from 'next/link'

const InstrumentSerif = Instrument_Serif({
    subsets:["latin"],
    weight:"400",
    style:"italic"
})

function Navbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <MaxWidthWrapper>
      <div className='flex px-4 py-4 md:py-5 items-center justify-between'>
        <Link href={"/"} className="flex-shrink-0">
          <div className={`font-bold text-xl md:text-2xl ${InstrumentSerif.className}`}>
            Thumbnaily
          </div>
        </Link> 
        
        {/* Desktop Navigation */}
        <div className='hidden md:flex justify-center items-center gap-6 lg:gap-8 absolute left-1/2 transform -translate-x-1/2'>
            <Link href='/' className='text-sm hover:text-primary/80 hover:scale-105 cursor-pointer transition'>Home</Link>
            <Link href='/' className='text-sm hover:text-primary/80 hover:scale-105 cursor-pointer transition'>Services</Link>
            <Link href='/' className='text-sm hover:text-primary/80 hover:scale-105 cursor-pointer transition'>Features</Link>
            <Link href='/pricing' className='text-sm hover:text-primary/80 hover:scale-105 cursor-pointer transition'>Pricing</Link>
        </div>
        
        {/* Mobile Menu Button */}
        <div className='md:hidden'>
          <button 
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="p-2 rounded-md"
          >
            {mobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
        
        {/* Desktop Actions */}
        <div className='hidden md:flex gap-2 flex-shrink-0'>
          <ModeToggle/>
          <Link href="/waitlist">
            <button className="flex items-center gap-2 border border-primary/20 px-4 sm:px-6 md:px-8 py-2 rounded-full hover:bg-primary hover:text-secondary transition text-sm">
              Get Started <ArrowRight size={15}/>
            </button>
          </Link>
        </div>
      </div>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden py-4 px-2 space-y-4 bg-background border-t">
          <Link href='/' className='block py-2 text-sm hover:text-primary/80'>Home</Link>
          <Link href='/' className='block py-2 text-sm hover:text-primary/80'>Services</Link>
          <Link href='/' className='block py-2 text-sm hover:text-primary/80'>Features</Link>
          <Link href='/pricing' className='block py-2 text-sm hover:text-primary/80'>Pricing</Link>
          
          <div className='flex items-center justify-between pt-3 border-t'>
            <ModeToggle/>
            <Link href="/waitlist">
              <button className="flex items-center gap-2 border border-primary/20 px-4 py-2 rounded-full hover:bg-primary hover:text-secondary transition text-sm">
                Get Started <ArrowRight size={15}/>
              </button>
            </Link>
          </div>
        </div>
      )}
    </MaxWidthWrapper>
  )
}

export default Navbar