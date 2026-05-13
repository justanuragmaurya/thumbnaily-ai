import { NextRequest, NextResponse } from "next/server";
import db from "@repo/db"
import { getJsonCache, setJsonCache } from "@repo/queue";

export const runtime = "nodejs";

export async function POST(req:NextRequest){
    
    const {thumbnailid} = await req.json();
    const cacheKey = `thumb:detail:${thumbnailid}`;
    const cached = await getJsonCache(cacheKey);

    if (cached) {
        return NextResponse.json(cached);
    }
    
    const data = await db.thumbnails.findUnique({
        where:{
            id:thumbnailid
        },
        include: {
            referenceImages: true,
            creator: {
                select: {
                    id: true,
                    name: true,
                    avatar: true,
                }
            }
        }
    });

    if(!data){
        return NextResponse.json({
            error:"Data not found."
        })
    }

    const response = {data, user: data.creator};
    await setJsonCache(cacheKey, response, 300);

    return(NextResponse.json(response))
}