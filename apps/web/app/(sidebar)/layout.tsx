"use client";

import AppSidebar from "@/components/app-sidebar";
import React, { useState } from "react";
import { Menu as MenuIcon, X as XIcon } from "lucide-react";
import { signIn, useSession } from "next-auth/react";
import Image from "next/image";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Sora } from "next/font/google";

const sora = Sora({
  subsets: ["latin"],
  weight: ["600", "700"],
});

export default function SidebarLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { status } = useSession();

  if (status === "authenticated") {
    return (
      <div className="flex h-screen bg-background text-foreground">
        <AppSidebar
          isMobileMenuOpen={isMobileMenuOpen}
          setIsMobileMenuOpen={setIsMobileMenuOpen}
        />
        <div className="flex flex-col flex-1 overflow-hidden">
          <div className="p-3 md:hidden sticky top-0 bg-background z-10 flex items-center border-b border-border/50">
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="p-2 rounded-lg text-muted-foreground hover:text-foreground hover:bg-muted transition-colors"
              aria-label={isMobileMenuOpen ? "Close menu" : "Open menu"}
            >
              {isMobileMenuOpen ? (
                <XIcon size={20} />
              ) : (
                <MenuIcon size={20} />
              )}
            </button>
          </div>
          <main className="flex-1 overflow-y-auto">{children}</main>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />

      <div className="flex-grow flex justify-center items-center flex-col px-4">
        <div className="text-center max-w-sm">
          <h1
            className={`text-2xl md:text-3xl font-bold tracking-tight ${sora.className}`}
          >
            Sign in to continue
          </h1>
          <p className="text-muted-foreground mt-2 text-sm">
            Create AI-powered thumbnails in seconds.
          </p>
          <button
            className="mt-6 inline-flex items-center gap-3 bg-foreground text-background font-medium px-6 py-3 rounded-xl hover:opacity-90 transition-opacity cursor-pointer"
            onClick={() => signIn("google")}
          >
            <Image
              src="https://cdn.iconscout.com/icon/free/png-256/free-google-logo-icon-download-in-svg-png-gif-file-formats--brands-pack-logos-icons-189824.png?f=webp&w=256"
              height={18}
              width={18}
              alt="Google"
            />
            <span className="text-sm">Continue with Google</span>
          </button>
        </div>
      </div>

      <Footer />
    </div>
  );
}
