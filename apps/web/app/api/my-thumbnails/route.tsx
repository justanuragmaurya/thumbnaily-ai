import { NextResponse } from "next/server";
import db from "@repo/db"
import { auth } from "@/lib/auth";

export async function GET(){
    const session = await auth()

    if(!session){
        return NextResponse.json({
            "error":"User not found"
        })
    }
    
    const user = await db.user.findFirst({
        where:{
            email:session?.user?.email as string
        }
    })

    const thumbnails = await db.thumbnails.findMany({
        where:{
            creatorID:user?.id
        },
        include: {
            referenceImages: true
        }
    })

    return NextResponse.json({
        thumbnails
    })
}