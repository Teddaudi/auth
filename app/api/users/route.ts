import { NextRequest, NextResponse } from "next/server";
import User from "../../../models/userModel";
import { connect } from "../../../dbConfig/dbConfig";

export async function GET(request: NextRequest) {
  try {
    await connect()
    const data = await User.find({});
    return NextResponse.json({
      message: "Successful",
      success: true,
      data: data
    });
  } catch (error: any) {
    return NextResponse.json({
      message: error.message,
      success: false
    });
  }
}
