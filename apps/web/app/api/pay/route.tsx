import { auth } from "@/lib/auth";
import DodoPayments from "dodopayments";
import { NextRequest, NextResponse } from "next/server";

export async function GET(){
    const client = new DodoPayments({
        bearerToken: process.env.DODO_PAYMENTS_API_KEY,
        environment: 'test_mode'
    })

    const payment = await client.payments.create({
        payment_link: true,
        billing: {
          city: "city",
          country: "IN",
          state: "state",
          street: "street",
          zipcode: "zipcode",
        },
        customer: { email: "justanuragmaurya@gmail.com", name: "Anurag Maurya" },
        product_cart: [{ product_id: "pdt_ryPo94ykk7AzQwfFLksnx", quantity: 1 }],
    });

    return NextResponse.json({
        link:payment.payment_link
    })
}

export async function POST(req:NextRequest){
    const { product_id , country } = await req.json();
    const session = await auth();

    if(!session){
        return NextResponse.json({
            error:true,
            message:"Not Authenticated"
        });
    }
    
    console.log(product_id);
    
    if(!product_id || !country){
        return NextResponse.json({
            error:true,
            message:"Invalid Product"
        })
    }

    const client = new DodoPayments({
        bearerToken: process.env.DODO_PAYMENTS_API_KEY,
        environment: "live_mode"
    })
    if(!process.env.NEXTAUTH_URL){
        return NextResponse.json({
            error:true,
            message:"Invalid URL"
        })
    }
    const payment = await client.payments.create({
        payment_link: true,
        return_url:`${process.env.NEXTAUTH_URL}/credits`,
        billing: {
          city: "city",
          country: country,
          state: "state",
          street: "street",
          zipcode: "zipcode",
        },
        customer: { email: session.user.email!, name:  session.user.name!},
        product_cart: [{ product_id: product_id, quantity: 1 }],
    });

    return NextResponse.json({
        link:payment.payment_link
    })
}