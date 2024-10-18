import { NextRequest, NextResponse } from "next/server";
import coinbase from 'coinbase-commerce-node';
import User from "../../../../models/userModel";

const { Client, Webhook, resources } = coinbase;


Client.init(process.env.COIN_BASE_API!);

// Define the secret for webhook verification.
const WEBHOOK_SECRET = process.env.COIN_BASE_WEBHOOK_SECRET;

export async function POST(request: NextRequest) {
    try {
        // Verify and parse the webhook request.
        const rawBody = await request.text(); // Get the raw request body for verification.
        const signature = request.headers.get("X-CC-Webhook-Signature");

        if (!signature) {
            return NextResponse.json({ error: "Missing signature header" }, { status: 400 });
        }

        const event = Webhook.verifyEventBody(rawBody, signature, "d59100b2-7201-48bf-9f9b-e51cab872a79");
        const userEmail = event.data.metadata.user_email;
        const amount = event.data.pricing.local.amount;
        
        // Log the event to inspect the details.
        // console.log(user);
        // if (event.type === "charge:created") {
        //     console.log("Creating")
        // }
        if (event.type === "charge:confirmed") {
            await User.findOneAndUpdate(
                { email: userEmail },
                { investment: amount },
                { new: true }
            )
            return NextResponse.json({
                message: "Payment sucessful",
                success: true,
            })
        }

        return NextResponse.json({ message: "Webhook received", event });

    } catch (error: any) {
        console.error("Error processing webhook:", error.message);
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}