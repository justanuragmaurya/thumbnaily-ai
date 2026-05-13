import db from "@repo/db"

export async function reduceCredit({email,cost}:{email:string,cost:number}){
    await db.user.update({
        where:{
            email:email
        },
        data:{
          credits: { decrement: cost },
        }
    })
}

export async function addCredit({email,add}:{email:string,add:number}){
    await db.user.update({
        where:{
            email:email
        },
        data:{
          credits: { increment: add },
        }
    })
}