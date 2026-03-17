import Footer from "@/components/Footer";
import LandingPage from "@/components/LandingPage";
import Navbar from "@/components/Navbar";
import db from "@repo/db";

async function getLatestThumbnails() {
  try {
    const thumbnails = await db.thumbnails.findMany({
      where: { isPublic: true },
      orderBy: { createdAt: "desc" },
      take: 12,
      select: { link: true },
    });
    return thumbnails.map((t) => t.link);
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
