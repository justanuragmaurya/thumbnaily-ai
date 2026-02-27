"use client";
import React, { useState } from "react";
import { MaxWidthWrapper } from "@/components/MaxWidthWrapper";
import { Sora } from "next/font/google";
import { ModeToggle } from "./ModeToggle";
import { Menu, X } from "lucide-react";
import Link from "next/link";

const sora = Sora({
  subsets: ["latin"],
  weight: ["700"],
});

function Navbar() {
  const [open, setOpen] = useState(false);

  return (
    <nav className="fixed w-full top-0 z-50 backdrop-blur-xl bg-background/80">
      <MaxWidthWrapper>
        <div className="flex items-center justify-between px-4 h-16">
          <Link href="/" className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-red-600 inline-block" />
            <span className={`text-lg tracking-tight ${sora.className}`}>
              thumbnaily
            </span>
          </Link>

          <div className="hidden md:flex items-center gap-8">
            <Link
              href="/"
              className="text-sm text-muted-foreground hover:text-foreground transition-colors"
            >
              Home
            </Link>
            <Link
              href="/pricing"
              className="text-sm text-muted-foreground hover:text-foreground transition-colors"
            >
              Pricing
            </Link>
            <Link
              href="/contact"
              className="text-sm text-muted-foreground hover:text-foreground transition-colors"
            >
              Contact
            </Link>
          </div>

          <div className="hidden md:flex items-center gap-3">
            <ModeToggle />
            <Link
              href="/app"
              className="text-sm font-medium bg-red-600 hover:bg-red-700 text-white px-5 py-2 rounded-lg transition-colors"
            >
              Get Started
            </Link>
          </div>

          <button
            className="md:hidden p-2"
            onClick={() => setOpen(!open)}
            aria-label={open ? "Close menu" : "Open menu"}
          >
            {open ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>

        {open && (
          <div className="md:hidden px-4 pb-4 space-y-1 border-t border-border/50">
            <Link
              href="/"
              className="block py-3 text-sm text-muted-foreground hover:text-foreground transition-colors"
            >
              Home
            </Link>
            <Link
              href="/pricing"
              className="block py-3 text-sm text-muted-foreground hover:text-foreground transition-colors"
            >
              Pricing
            </Link>
            <Link
              href="/contact"
              className="block py-3 text-sm text-muted-foreground hover:text-foreground transition-colors"
            >
              Contact
            </Link>
            <div className="flex items-center justify-between pt-3 border-t border-border/50">
              <ModeToggle />
              <Link
                href="/app"
                className="text-sm font-medium bg-red-600 text-white px-5 py-2 rounded-lg"
              >
                Get Started
              </Link>
            </div>
          </div>
        )}
      </MaxWidthWrapper>
    </nav>
  );
}

export default Navbar;
