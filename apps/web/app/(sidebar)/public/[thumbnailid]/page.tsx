"use client";
import { Button } from "@/components/ui/button";
import axios from "axios";
import { Copy, User, Loader2, ArrowLeft } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import { toast } from "sonner";
import { Sora } from "next/font/google";
import { appCache } from "@/lib/cache";

const sora = Sora({
  subsets: ["latin"],
  weight: ["600", "700"],
});

interface MainData {
  data: { prompt: string; link: string; createdAt: Date };
  user: { name: string; avatar: string };
}

export default function ThumbnailDetails() {
  const { thumbnailid } = useParams();
  const cacheKey = `details:${thumbnailid}`;
  const cached = appCache.get<MainData>(cacheKey);

  const [loading, setLoading] = useState(!cached);
  const [data, setData] = useState<MainData | null>(cached ?? null);

  useEffect(() => {
    if (cached) return;
    async function getDetails() {
      setLoading(true);
      const response = await axios.post("/api/getdetails", {
        thumbnailid,
      });
      setData(response.data);
      appCache.set(cacheKey, response.data);
      setLoading(false);
    }
    getDetails();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [thumbnailid]);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-full">
        <Loader2 className="h-5 w-5 animate-spin text-muted-foreground" />
      </div>
    );
  }

  if (!data) return null;

  return (
    <div className="max-w-5xl mx-auto px-4 py-10 md:py-14">
      <Link
        href="/public"
        className="inline-flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground transition-colors mb-8"
      >
        <ArrowLeft className="h-4 w-4" />
        Back to explore
      </Link>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-10">
        <div className="space-y-4">
          <div className="rounded-xl overflow-hidden border border-border/50">
            <Image
              src={data.data.link}
              width={1920}
              height={1080}
              alt="Thumbnail"
              className="w-full"
            />
          </div>

          <div className="flex items-center gap-3">
            {data.user.avatar ? (
              <Image
                src={data.user.avatar}
                width={40}
                height={40}
                alt="Creator"
                className="rounded-full border border-border/50"
              />
            ) : (
              <div className="w-10 h-10 rounded-full bg-muted flex items-center justify-center">
                <User className="h-4 w-4 text-muted-foreground" />
              </div>
            )}
            <div>
              <p className="text-sm font-medium">{data.user.name}</p>
              <p className="text-xs text-muted-foreground">
                {new Date(data.data.createdAt).toLocaleDateString("en-US", {
                  year: "numeric",
                  month: "long",
                  day: "numeric",
                })}
              </p>
            </div>
          </div>
        </div>

        <div>
          <div className="flex items-center justify-between mb-3">
            <h2 className={`text-lg font-semibold ${sora.className}`}>
              Prompt Used
            </h2>
            <Button
              variant="outline"
              size="sm"
              className="rounded-lg border-border/50 gap-1.5"
              onClick={() => {
                navigator.clipboard.writeText(data.data.prompt);
                toast("Prompt copied to clipboard");
              }}
            >
              <Copy className="h-3.5 w-3.5" />
              Copy
            </Button>
          </div>
          <div className="p-5 rounded-xl border border-border/50 bg-card/30">
            <p className="text-sm text-muted-foreground leading-relaxed">
              {data.data.prompt}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
