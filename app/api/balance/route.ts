import { NextRequest, NextResponse } from "next/server";
import { getDataFromToken } from "../../../helpers/getDataFromToken";
import User from "../../../models/userModel";

export async function PUT(request: NextRequest) {
    try {
        const reqBody = await request.json();
        const { amount } = reqBody;
        
        const userId = await getDataFromToken(request);
        
        const user = await User.findByIdAndUpdate(
            userId, 
            { investment: amount },
            {
                new: true,
                runValidators: true,
            }
        );

        if (!user) {
            return NextResponse.json({ error: "User not found" }, { status: 404 });
        }

        return NextResponse.json({ success: true, user }, { status: 200 });
    } catch (error: any) {
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}
