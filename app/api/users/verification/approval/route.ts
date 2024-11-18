import { NextRequest, NextResponse } from "next/server";
import mongoose from "mongoose";
import { getDataFromToken } from "../../../../../helpers/getDataFromToken";
import User from "../../../../../models/userModel";

export async function PUT(req: NextRequest) {
    try {
      const data = await req.json();
      const { userId } = data;
  
      await User.findByIdAndUpdate(userId, { idVerification: true });
  
      return NextResponse.json({ message: "Verification successful.", success: true });
    } catch (error:any) {
      console.error("Error approving verification:", error);
      return NextResponse.json({ error: error.message }, { status: 500 });
    }
  }
  
  