import db from "@repo/db";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  const { searchParams } = req.nextUrl;
  const cursor = searchParams.get("cursor");
  const limit = Math.min(Number(searchParams.get("limit")) || 15, 50);

  const thumbnails = await db.thumbnails.findMany({
    take: limit + 1,
    orderBy: { createdAt: "desc" },
    ...(cursor && {
      cursor: { id: cursor },
      skip: 1,
    }),
  });

  const hasMore = thumbnails.length > limit;
  const data = hasMore ? thumbnails.slice(0, limit) : thumbnails;
  const nextCursor = hasMore ? data[data.length - 1]!.id : null;

  return NextResponse.json({ data, nextCursor });
}
