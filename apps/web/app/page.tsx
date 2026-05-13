import Footer from "@/components/Footer";
import LandingPage from "@/components/LandingPage";
import Navbar from "@/components/Navbar";
import db from "@repo/db";
import { getJsonCache, setJsonCache } from "@repo/queue";

export const dynamic = "force-dynamic";

async function getLatestThumbnails() {
  try {
    const cacheKey = "homepage:latest-thumbnails";
    const cached = await getJsonCache<string[]>(cacheKey);
    if (cached) {
      return cached;
    }

    const thumbnails = await db.thumbnails.findMany({
      where: { isPublic: true },
      orderBy: { createdAt: "desc" },
      take: 12,
      select: { link: true },
    });
    const links = thumbnails.map((t) => t.link);
    await setJsonCache(cacheKey, links, 60);

    return links;
  } catch {
    return [];
  }
}

export default async function Home() {
  const thumbnailUrls = await getLatestThumbnails();

  return (
    <>
      <Navbar />
      <LandingPage thumbnailUrls={thumbnailUrls} />
      <Footer />
    </>
  );
}
