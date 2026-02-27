"use client";
import axios from "axios";
import { Download, Loader2 } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { Sora } from "next/font/google";
import { appCache } from "@/lib/cache";

const sora = Sora({
  subsets: ["latin"],
  weight: ["600", "700"],
});

const CACHE_KEY = "my-thumbnails";

export default function MyThumbnails() {
  const cached = appCache.get<{ link: string; createdAt: Date }[]>(CACHE_KEY);

  const [data, setData] = useState(cached ?? []);
  const [loading, setLoading] = useState(!cached);

  useEffect(() => {
    if (cached) return;
    async function getThumbnails() {
      try {
        const response = await axios.get("/api/my-thumbnails");
        const thumbnails = response.data.thumbnails;
        setData(thumbnails);
        appCache.set(CACHE_KEY, thumbnails);
      } finally {
        setLoading(false);
      }
    }
    getThumbnails();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="max-w-6xl mx-auto px-4 py-10 md:py-14">
      <div className="mb-8">
        <h1
          className={`text-2xl md:text-3xl font-bold tracking-tight ${sora.className}`}
        >
          Your Thumbnails
        </h1>
        <p className="text-muted-foreground text-sm mt-1">
          All your generated thumbnails in one place.
        </p>
      </div>

      {loading && (
        <div className="flex items-center justify-center py-20">
          <Loader2 className="h-5 w-5 animate-spin text-muted-foreground" />
        </div>
      )}

      {!loading && data.length === 0 && (
        <div className="text-center py-20">
          <p className="text-muted-foreground">
            No thumbnails yet. Go generate some!
          </p>
        </div>
      )}

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
        {[...data]
          .reverse()
          .map((e: { link: string; createdAt: Date }) => (
            <div
              key={e.link}
              className="group relative rounded-xl overflow-hidden border border-border/50"
            >
              <Image
                src={e.link}
                width={1920}
                height={1080}
                alt="Thumbnail"
                className="w-full"
              />
              <div className="absolute inset-0 bg-black/0 group-hover:bg-black/30 transition-colors duration-200 flex items-end justify-between p-3">
                <span className="text-xs text-white/0 group-hover:text-white/70 transition-colors duration-200">
                  {new Date(e.createdAt).toLocaleDateString()}
                </span>
                <Link
                  href={e.link}
                  target="_blank"
                  className="opacity-0 group-hover:opacity-100 transition-opacity duration-200"
                >
                  <div className="w-8 h-8 rounded-full bg-white/90 flex items-center justify-center hover:bg-white transition-colors">
                    <Download className="h-3.5 w-3.5 text-black" />
                  </div>
                </Link>
              </div>
            </div>
          ))}
      </div>
    </div>
  );
}
