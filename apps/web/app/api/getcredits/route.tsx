import { auth } from "@/lib/auth"
import db from "@repo/db"
import { NextResponse } from "next/server"

export async function GET(){
    const session = await auth();
    
    if(!session || !session.user.email){
        return NextResponse.json({
            error:true,
            message:"Not Authenticated"
        })
    }
    const user = await db.user.findUnique({
        where:{
            email:session.user.email
        }
    })

    return NextResponse.json({
        credits:user?.credits
    })
}