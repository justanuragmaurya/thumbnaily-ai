import { NextResponse } from "next/server";
import db from "@repo/db"
import { auth } from "@/lib/auth";
import { getJsonCache, setJsonCache } from "@repo/queue";

export const runtime = "nodejs";

export async function GET(){
    const session = await auth()

    if(!session){
        return NextResponse.json({
            "error":"User not found"
        })
    }
    
    const user = await db.user.findUnique({
        where:{
            email:session?.user?.email as string
        },
        select: {
            id: true
        }
    })

    if(!user){
        return NextResponse.json({
            thumbnails: []
        })
    }

    const cacheKey = `thumbs:user:${user.id}:page:1`;
    const cached = await getJsonCache(cacheKey);
    if (cached) {
        return NextResponse.json(cached);
    }

    const thumbnails = await db.thumbnails.findMany({
        where:{
            creatorID:user.id
        },
        orderBy: {
            createdAt: "desc"
        },
        select: {
            id: true,
            link: true,
            prompt: true,
            isPublic: true,
            createdAt: true,
        }
    })

    const response = {
        thumbnails
    };
    await setJsonCache(cacheKey, response, 60);

    return NextResponse.json(response)
}