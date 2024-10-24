import axios from 'axios'
import crypto from 'crypto'
import { NextRequest, NextResponse } from 'next/server'

const merchantId = "ae3a643d-f029-4b66-9d31-be615c160fcc"
const apiKey = "bUoqh27gobdMb9NMzXHXGFzDPrOd2P9xJqvJqSoTHJS8TDjinrjCTXmdz1Fb9sViY1mXmuCAbFFLoUaIL2lYMAcR7W4edsNB77UH7DX4CMLmXWb5gcDSJ8b7hLOu94ou"
const userApiKey = "7b88988389385e8f9d65f7c87fd29f7ee21e038c"

export async function POST(request: NextRequest) {
    const reqBody = await request.json()
    console.log("Request Body:", reqBody)
    const { amount, currency } = reqBody

    try {
        const data = {
            amount,
            currency,
            order_id: crypto.randomBytes(12).toString('hex')
        }
        
        const sign = crypto.createHash("md5")
            .update(
                Buffer.from(JSON.stringify(data) + apiKey).toString("base64")
            )
            .digest("hex")

        const response = await axios.post('https://api.cryptomus.com/v1/payment/services', {
            headers: {
                merchant: merchantId,
                sign: sign
            }
        })
        console.log("response:", response.data)
        return NextResponse.json({
            success: true,
            data: response.data
        })
    } catch (error: any) {
        console.error("Error:", error.message)
        return NextResponse.json({
            success: false,
            error: error.message
        })
    }
}
