import DodoPayments from "dodopayments";
import { NextResponse } from "next/server";

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