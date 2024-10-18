import { NextRequest, NextResponse } from "next/server";
import coinbase from 'coinbase-commerce-node';
import User from "../../../../models/userModel";

const { Client, Webhook, resources } = coinbase;
const { Charge } = resources;

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

        // Verify the webhook event.
        const event = Webhook.verifyEventBody(rawBody, signature, "d59100b2-7201-48bf-9f9b-e51cab872a79");

        // Log the event for debugging purposes.
        // console.log("Received event:", event.data);

        // Check if `event.data` looks like a charge object with `metadata`.
        if (event.type === "charge:confirmed" && event.data && (event.data as any).metadata) {
            const data = event.data as any;
            const userEmail = data.metadata.user_email;
            const amount = data.pricing.local.amount;
            
            await User.findOneAndUpdate(
                { email: userEmail },
                { investment: amount },
                { new: true }
            );

            return NextResponse.json({
                message: "Payment successful",
                success: true,
            });
        }

        return NextResponse.json({ message: "Webhook received", event });
    } catch (error: any) {
        console.error("Error processing webhook:", error.message);
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}
