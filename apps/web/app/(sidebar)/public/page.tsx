"use client";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState, useRef, useCallback } from "react";
import { Loader2 } from "lucide-react";
import { appCache } from "@/lib/cache";

interface Thumbnail {
  id: string;
  link: string;
  prompt: string;
  createdAt: string;
}

interface ExploreState {
  thumbnails: Thumbnail[];
  cursor: string | null;
  hasMore: boolean;
}

const CACHE_KEY = "explore";

export default function ExplorePage() {
  const cached = appCache.get<ExploreState>(CACHE_KEY);

  const [thumbnails, setThumbnails] = useState<Thumbnail[]>(
    cached?.thumbnails ?? []
  );
  const [cursor, setCursor] = useState<string | null>(
    cached?.cursor ?? null
  );
  const [hasMore, setHasMore] = useState(cached?.hasMore ?? true);
  const [loading, setLoading] = useState(false);
  const [initialLoad, setInitialLoad] = useState(!cached);
  const sentinelRef = useRef<HTMLDivElement>(null);
  const loadingRef = useRef(false);

  const fetchPage = useCallback(
    async (pageCursor: string | null) => {
      if (loadingRef.current) return;
      loadingRef.current = true;
      setLoading(true);

      const params = new URLSearchParams({ limit: "15" });
      if (pageCursor) params.set("cursor", pageCursor);

      try {
        const res = await fetch(`/api/explore?${params}`);
        const json = await res.json();

        setThumbnails((prev) => {
          const existingIds = new Set(prev.map((t) => t.id));
          const fresh = (json.data as Thumbnail[]).filter(
            (t) => !existingIds.has(t.id)
          );
          const next = [...prev, ...fresh];
          appCache.set(CACHE_KEY, {
            thumbnails: next,
            cursor: json.nextCursor,
            hasMore: !!json.nextCursor,
          } satisfies ExploreState);
          return next;
        });
        setCursor(json.nextCursor);
        setHasMore(!!json.nextCursor);
      } finally {
        loadingRef.current = false;
        setLoading(false);
        setInitialLoad(false);
      }
    },
    []
  );

  useEffect(() => {
    if (!cached) fetchPage(null);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (!sentinelRef.current || !hasMore) return;

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0]?.isIntersecting && !loadingRef.current && hasMore) {
          fetchPage(cursor);
        }
      },
      { rootMargin: "200px" }
    );

    observer.observe(sentinelRef.current);
    return () => observer.disconnect();
  }, [cursor, hasMore, fetchPage]);

  return (
    <div className="max-w-6xl mx-auto px-4 py-10 md:py-14">
      <div className="mb-8">
        <h1 className="text-2xl md:text-3xl font-bold tracking-tight">
          Explore
        </h1>
        <p className="text-muted-foreground text-sm mt-1">
          Thumbnails created by the community.
        </p>
      </div>

      {initialLoad && (
        <div className="flex items-center justify-center py-20">
          <Loader2 className="h-5 w-5 animate-spin text-muted-foreground" />
        </div>
      )}

      {!initialLoad && thumbnails.length === 0 && (
        <div className="text-center py-20">
          <p className="text-muted-foreground">No thumbnails yet.</p>
        </div>
      )}

      <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
        {thumbnails.map((t) => (
          <Link
            key={t.id}
            href={`/public/${t.id}`}
            className="group relative rounded-xl overflow-hidden border border-border/50"
          >
            <Image
              src={t.link}
              width={1920}
              height={1080}
              alt="Thumbnail"
              className="w-full transition-transform duration-300 group-hover:scale-[1.02]"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-200 flex items-end p-3">
              <span className="text-xs text-white/80">View details</span>
            </div>
          </Link>
        ))}
      </div>

      <div ref={sentinelRef} className="py-8 flex justify-center">
        {loading && !initialLoad && (
          <Loader2 className="h-5 w-5 animate-spin text-muted-foreground" />
        )}
        {!hasMore && thumbnails.length > 0 && (
          <p className="text-xs text-muted-foreground/50">
            You&apos;ve seen them all.
          </p>
        )}
      </div>
    </div>
  );
}
