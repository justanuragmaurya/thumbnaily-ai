"use client";

import AppSidebar from "@/components/app-sidebar";
import React, { useState } from 'react';
import { Menu as MenuIcon, X as XIcon } from 'lucide-react'; // Assuming you use lucide-react

export default function SidebarLayout({
    children,
  }: Readonly<{
    children: React.ReactNode;
  }>) {
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

    const toggleMobileMenu = () => {
      setIsMobileMenuOpen(!isMobileMenuOpen);
    };

    return (
        <div className="flex h-screen bg-background text-foreground">
            <AppSidebar isMobileMenuOpen={isMobileMenuOpen} setIsMobileMenuOpen={setIsMobileMenuOpen} />
            <div className="flex flex-col flex-1 overflow-hidden">
              <div className="p-4 md:hidden sticky top-0 bg-background z-10 flex items-center">
                <button
                  onClick={toggleMobileMenu}
                  className="p-2 rounded-md text-slate-700 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800"
                  aria-label={isMobileMenuOpen ? "Close menu" : "Open menu"}
                >
                  {isMobileMenuOpen ? <XIcon size={24} /> : <MenuIcon size={24} />}
                </button>
              </div>
              <main className="flex-1 overflow-y-auto ">
                {children}
              </main>
            </div>
        </div>
    );
  }