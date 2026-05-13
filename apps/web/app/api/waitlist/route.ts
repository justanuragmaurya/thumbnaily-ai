import { NextRequest , NextResponse } from "next/server";
import db from "@repo/db"
export async function POST(req:NextRequest){
    const { email } = await req.json()

    if(!email){
        return NextResponse.json({
        success:false
        
    })
    }
    
    await db.waitlistUsers.upsert({
        where:{
            email
        },
        create:{
            email
        },
        update:{
            email
        }
    })

    return NextResponse.json({
        success:true
    })
}