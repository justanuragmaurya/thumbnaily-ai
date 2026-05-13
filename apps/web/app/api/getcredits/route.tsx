import { auth } from "@/lib/auth"
import db from "@repo/db"
import { getJsonCache, setJsonCache } from "@repo/queue";
import { NextResponse } from "next/server"

export const runtime = "nodejs";

export async function GET(){
    const session = await auth();
    
    if(!session || !session.user.email){
        return NextResponse.json({
            error:true,
            message:"Not Authenticated"
        })
    }
    const cacheKey = `credits:email:${session.user.email}`;
    const cachedCredits = await getJsonCache<number>(cacheKey);
    if (cachedCredits !== null) {
        return NextResponse.json({
            credits: cachedCredits
        })
    }

    const user = await db.user.findUnique({
        where:{
            email:session.user.email
        },
        select: {
            credits: true
        }
    })

    if (typeof user?.credits === "number") {
        await setJsonCache(cacheKey, user.credits, 30);
    }

    return NextResponse.json({
        credits:user?.credits
    })
}