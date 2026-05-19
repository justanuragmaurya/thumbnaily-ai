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
        <div className="max-w-6xl w-full grid md:grid-cols-2 gap-10 items-center">
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

          {/* Right Section - Contact Form */}
          <div className="border bg-card rounded-3xl p-8 shadow-lg hover:shadow-2xl transition-all duration-300">
            <h2 className="text-3xl font-bold mb-6">Send a Message</h2>

            <form className="space-y-5">
              {/* Name */}
              <div>
                <label className="text-sm font-medium mb-2 block">Name</label>

                <div className="relative">
                  <User
                    className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground"
                    size={18}
                  />

                  <input
                    type="text"
                    placeholder="Enter your name"
                    className="w-full border rounded-xl py-3 pl-10 pr-4 outline-none focus:ring-2 focus:ring-primary transition-all bg-background"
                  />
                </div>
              </div>

              {/* Email */}
              <div>
                <label className="text-sm font-medium mb-2 block">Email</label>

                <div className="relative">
                  <Mail
                    className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground"
                    size={18}
                  />

                  <input
                    type="email"
                    placeholder="Enter your email"
                    className="w-full border rounded-xl py-3 pl-10 pr-4 outline-none focus:ring-2 focus:ring-primary transition-all bg-background"
                  />
                </div>
              </div>

              {/* Message */}
              <div>
                <label className="text-sm font-medium mb-2 block">
                  Message
                </label>

                <div className="relative">
                  <MessageSquare
                    className="absolute left-3 top-4 text-muted-foreground"
                    size={18}
                  />

                  <textarea
                    rows={5}
                    placeholder="Write your message..."
                    className="w-full border rounded-xl py-3 pl-10 pr-4 outline-none focus:ring-2 focus:ring-primary transition-all bg-background resize-none"
                  />
                </div>
              </div>

              {/* Submit */}
              <button
                type="submit"
                className="w-full flex items-center justify-center gap-2 bg-primary text-white py-3 rounded-xl hover:opacity-90 transition-all font-medium"
              >
                <Send size={18} />
                Send Message
              </button>
            </form>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
