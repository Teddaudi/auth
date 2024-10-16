import { NextRequest, NextResponse } from "next/server"
import { initializePayment } from '../../../lib/payment';
import { getAllPayments } from "../../../lib/listPayments";

export  async function POST(request: NextRequest) {
    try {
      const reqBody = await request.json()
      console.log("payment:", reqBody)
      const { email, amount } = reqBody;
    const paymentResponse = await initializePayment({ email, amount });
    return NextResponse.json(paymentResponse);
  } catch (error :any) {
    return NextResponse.json({ message: 'Payment initialization failed', error: error.message });
  }
}

export async function GET() {
  try {
  const res = await getAllPayments()
  return NextResponse.json({message: "Details found", data:res})
  } catch (error: any) {
    return NextResponse.json({ message: 'Unable to get payment details', error: error.message });
  }
}