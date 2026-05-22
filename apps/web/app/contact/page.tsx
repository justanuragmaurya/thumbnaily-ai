//
"use client";

import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import {
  Mail,
  Linkedin,
  Twitter,
  Send,
  User,
  MessageSquare,
} from "lucide-react";

export default function ContactPage() {
  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Navbar />

      <main className="flex-1 flex items-center justify-center px-6 py-16">
        <div className="max-w-3xl w-full mx-auto">
          {/* Left Section */}
          <div className="space-y-6">
            <div>
              <h1 className="text-4xl md:text-5xl font-bold tracking-tight">
                Get In Touch
              </h1>

              <p className="text-muted-foreground mt-4 text-lg leading-relaxed">
                Have a question, feedback, or collaboration idea? Feel free to
                reach out through the contact form or connect on social media.
              </p>
            </div>

            {/* Profile Card */}
            <div className="border bg-card rounded-3xl p-8 shadow-lg hover:shadow-2xl transition-all duration-300 hover:-translate-y-1">
              <div className="flex flex-col items-center text-center">
                <Image
                  src="/anuragmaurya.png"
                  width={120}
                  height={120}
                  alt="Anurag Maurya"
                  className="rounded-full border-4 border-primary/20 shadow-md"
                />

                <h2 className="text-2xl font-bold mt-5">Anurag Maurya</h2>

                <Link
                  href="mailto:contact@anuragmaurya.com"
                  className="flex items-center gap-2 text-primary/70 hover:text-primary transition-colors mt-3"
                >
                  <Mail size={18} />
                  contact@anuragmaurya.com
                </Link>

                {/* Social Icons */}
                <div className="flex gap-5 mt-6">
                  <Link
                    href="https://x.com/codeanuragg"
                    target="_blank"
                    className="p-3 rounded-full border hover:bg-primary hover:text-white transition-all duration-300"
                    aria-label="Twitter"
                  >
                    <Twitter size={20} />
                  </Link>

                  <Link
                    href="https://www.linkedin.com/in/realanuragmaurya/"
                    target="_blank"
                    className="p-3 rounded-full border hover:bg-primary hover:text-white transition-all duration-300"
                    aria-label="LinkedIn"
                  >
                    <Linkedin size={20} />
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
