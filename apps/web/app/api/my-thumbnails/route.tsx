import { NextRequest, NextResponse } from "next/server";
import db from "@repo/db"
import { auth } from "@/lib/auth";

export async function GET(req:NextRequest){
    const session = await auth()

    if(!session){
        return NextResponse.json({
            "error":"User not found"
        })
    }
    
    const user = await db.user.findFirst({
        where:{
            email:session?.user.email!
        }
    })

    const thumbnails = await db.thumbnails.findMany({
        where:{
            creatorID:user?.id
        }
    })

    console.log(thumbnails)

    return NextResponse.json({
        thumbnails
    })
}