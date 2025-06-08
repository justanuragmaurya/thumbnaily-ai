import db from "@repo/db"
import { WebhookPayload } from "@/lib/types"

export const handlePayments = async(payload:WebhookPayload)=>{

    const email = payload.data.customer.email;
    const product_id = payload.data.product_cart[0]?.product_id;

    const user = await db.user.findFirst({
        where:{
            email:email
        }
    })

    const currentCredits = user?.credits as number;

    switch(product_id){
        case 'pdt_vNJc6ot0MMBfxSWtg6p2l':
            await db.user.update({
                where:{ 
                    email:email
                },
                data:{
                    credits:currentCredits+100,
                }
            })
            break;
        case 'pdt_B5VzoGkDoHNqiXk7ySoLQ':
            await db.user.update({
                where:{
                    email:email
                },
                data:{
                    credits:currentCredits+50,
                }
            })
            break;
        case 'pdt_fiZwCeFFCoOk0YB3fNrOH':
            await db.user.update({
                where:{
                    email:email
                },
                data:{
                    credits:currentCredits+25,
                }
            })
            break;
        
        default:
            console.log("Invalid product");
    }
}