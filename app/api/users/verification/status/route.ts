import { NextRequest, NextResponse } from "next/server";
import https from 'https';
import { getDataFromToken } from "../../../../../helpers/getDataFromToken";
import User from "../../../../../models/userModel";

export async function GET (req:NextRequest){
    try {
      const userId = await getDataFromToken(req);
      const user = await User.findById(userId)
      const verification = user.idVerification;
      console.log("user:", verification)
      return NextResponse.json({
        message:"User found",
        success:true,
        data: verification
      })
    } catch (error:any) {
      return NextResponse.json({
        message:"User not found",
        error: error.message
      })
    }
  }