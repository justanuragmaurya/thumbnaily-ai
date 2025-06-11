"use client"
import React, { useState } from 'react'
import { MaxWidthWrapper } from '@/components/MaxWidthWrapper'
import { Instrument_Serif } from 'next/font/google'
import { ModeToggle } from './ModeToggle'
import { Menu, X } from 'lucide-react'
import Link from 'next/link'
import GithubStarBtn from './ui/GithubStarBtn'

const InstrumentSerif = Instrument_Serif({
  subsets: ["latin"],
  weight: "400",
  style: "italic"
})

interface NavbarProps {
  onExternalMobileMenuToggle?: () => void;
  isExternalMobileMenuOpen?: boolean;
}

function Navbar({ onExternalMobileMenuToggle, isExternalMobileMenuOpen }: NavbarProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <div className="sticky top-0 z-50 backdrop-blur bg-background/70 border-b">
      <MaxWidthWrapper>
        <div className="flex items-center justify-between px-4 py-4 md:py-5">
          {/* Left: Logo */}
          <Link href="/" className="flex-shrink-0">
            <div className={`font-bold text-xl md:text-2xl ${InstrumentSerif.className}`}>
              Thumbnaily
            </div>
          </Link>

          {/* Center: Navigation Links (Desktop only) */}
          <div className="hidden md:flex justify-center items-center gap-6 lg:gap-8 flex-1">
            <Link href="/" className="block py-2 text-sm hover:text-primary/80">Home</Link>
            <Link href="/contact" className="block py-2 text-sm hover:text-primary/80">Contact</Link>
            <Link href="/pricing" className="block py-2 text-sm hover:text-primary/80">Pricing</Link>
          </div>

          {/* Right: Theme Toggle + Buttons (Desktop only) */}
          <div className="hidden md:flex items-center gap-6 flex-shrink-0">
            <ModeToggle />
            <GithubStarBtn />
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden">
            <button
              onClick={onExternalMobileMenuToggle ? onExternalMobileMenuToggle : () => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 rounded-md"
            >
              {(onExternalMobileMenuToggle ? isExternalMobileMenuOpen : mobileMenuOpen)
                ? <X size={20} />
                : <Menu size={20} />}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {!onExternalMobileMenuToggle && mobileMenuOpen && (
          <div className="md:hidden py-4 px-2 space-y-4 bg-background border-t">
            <Link href='/' className='block py-2 text-sm hover:text-primary/80'>Home</Link>
            <Link href='/contact' className='block py-2 text-sm hover:text-primary/80'>Contact</Link>
            <Link href='/pricing' className='block py-2 text-sm hover:text-primary/80'>Pricing</Link>

            <div className='flex justify-between items-center'>
              <div className='pt-3'>
                <ModeToggle />
              </div>
              <div className='mt-3'>
                <GithubStarBtn />
              </div>
            </div>
          </div>
        )}
      </MaxWidthWrapper>
    </div>
  )
}

export default Navbar