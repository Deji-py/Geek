import { stripe } from "@/utils/stripe";
import { NextResponse } from "next/server";

export async function POST(req) {
  const paymentInfo = await req.json();

  try {
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      success_url: `http://geek.tools/dashboard/payment?user= ${paymentInfo.user_id}&success=true`,
      cancel_url: `http://geek.tools/dashboard/payment?user= ${paymentInfo.user_id}&success=false`,
      customer_email: paymentInfo.email,
      client_reference_id: paymentInfo.user_id,
      mode: "payment",
      currency: "usd",
      metadata: paymentInfo.meta,
      line_items: [
        {
          price: paymentInfo?.price,
          quantity: 1,
        },
      ],
    });

    return NextResponse.json({ session: session.url });
  } catch (e) {
    return NextResponse.json({ error: e.message }, { status: 400 });
  }
}
