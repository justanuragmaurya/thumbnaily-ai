import db from "@repo/db"

export async function reduceCredit({email,cost}:{email:string,cost:number}){    
    const user = await db.user.findUnique({
        where:{
            email:email
        }
    })
    if(!user){
        return;
    }
    
    await db.user.update({
        where:{
            email:email
        },
        data:{
            credits:user?.credits-cost
        }
    })
}

export async function addCredit({email,add}:{email:string,add:number}){    
    const user = await db.user.findUnique({
        where:{
            email:email
        }
    })
    if(!user){
        return;
    }
    
    await db.user.update({
        where:{
            email:email
        },
        data:{
            credits:user?.credits+add
        }
    })
}