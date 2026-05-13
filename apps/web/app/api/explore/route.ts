import db from "@repo/db";
import { getJsonCache, setJsonCache } from "@repo/queue";
import { NextRequest, NextResponse } from "next/server";

export const runtime = "nodejs";

export async function GET(req: NextRequest) {
  const { searchParams } = req.nextUrl;
  const cursor = searchParams.get("cursor");
  const limit = Math.min(Number(searchParams.get("limit")) || 15, 50);
  const cacheKey = `thumbs:public:first-page:${limit}`;

  if (!cursor) {
    const cached = await getJsonCache<{ data: unknown[]; nextCursor: string | null }>(
      cacheKey
    );
    if (cached) {
      return NextResponse.json(cached);
    }
  }

  const thumbnails = await db.thumbnails.findMany({
    take: limit + 1,
    where: { isPublic: true },
    orderBy: { createdAt: "desc" },
    select: {
      id: true,
      link: true,
      prompt: true,
      createdAt: true,
    },
    ...(cursor && {
      cursor: { id: cursor },
      skip: 1,
    }),
  });

  const hasMore = thumbnails.length > limit;
  const data = hasMore ? thumbnails.slice(0, limit) : thumbnails;
  const nextCursor = hasMore ? data[data.length - 1]!.id : null;
  const response = { data, nextCursor };

  if (!cursor) {
    await setJsonCache(cacheKey, response, 60);
  }

  return NextResponse.json(response);
}
