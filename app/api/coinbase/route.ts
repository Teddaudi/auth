import { NextRequest, NextResponse } from "next/server"
import coinbase from 'coinbase-commerce-node';


const Client = coinbase.Client;
Client.init(process.env.COIN_BASE_API!)

const resources = coinbase.resources;

export async function POST(request: NextRequest) {
    const reqBody = await request.json()
    const { amount, currency, name, email } = reqBody;
    try {
        const charge = await resources.Charge.create({
            name: name,
            description: "Ezracapital",
            local_price: {
                amount: amount,
                currency: currency
            },
            pricing_type: "fixed_price",
            metadata: {
                user_email: email
            }
        })
        return NextResponse.json({
            message: "Payment initialized",
            success: true,
            charge: charge
        })

    } catch (error: any) {
        NextResponse.json({ error: error.message },
            { status: 500 }
        )
    }

}