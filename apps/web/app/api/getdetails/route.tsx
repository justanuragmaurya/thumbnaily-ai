import { NextRequest, NextResponse } from "next/server";
import db from "@repo/db"

export async function POST(req:NextRequest){
    
    const {thumbnailid} = await req.json();
    
    const data = await db.thumbnails.findUnique({
        where:{
            id:thumbnailid
        },
        include: {
            referenceImages: true
        }
    });

    if(!data){
        return NextResponse.json({
            error:"Data not found."
        })
    }

    const user = await db.user.findUnique({
        where:{
            id:data?.creatorID
        }
    })
    return(NextResponse.json({data,user}))
}