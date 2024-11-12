import { NextRequest, NextResponse } from "next/server";
import { getDataFromToken } from "../../../../helpers/getDataFromToken";
import User from "../../../../models/userModel";


export async function GET(request: NextRequest) {
    try {
        const userId = await getDataFromToken(request);
        const user = await User.findOne({ _id: userId }).select("-password");
        const userWithdrawal = user;
        return NextResponse.json({
            success: true,
            withdrawal: userWithdrawal
        })
    } catch (error: any) {
        NextResponse.json(error.message)
    }
}

export async function PUT(request: NextRequest) {
    try {
        // Parse the request body
        const userBody = await request.json();
        let { withdrawal } = userBody;

        // Convert withdrawal to a string (ensures it's always treated as a string)
        withdrawal = String(withdrawal);

        console.log("withdrawal:", withdrawal, typeof withdrawal);  // Log to confirm it's a string

        // Retrieve the user ID from the token
        const userId = await getDataFromToken(request);

        // Check if the user exists
        const user = await User.findById(userId);
        if (!user) {
            return NextResponse.json({ success: false, message: "User not found" }, { status: 404 });
        }

        // Update the user’s withdrawal value and return the updated document
        const updatedUser = await User.findByIdAndUpdate(
            userId,
            { withdrawal: withdrawal },  // Pass withdrawal as a string
            { new: true }    // Ensure the updated document is returned
        );


        // Check if the user was updated
        if (!updatedUser) {
            return NextResponse.json({ success: false, message: "Failed to update withdrawal" }, { status: 400 });
        }

        // Return a successful response with the updated user data
        return NextResponse.json({
            success: true,
            data: updatedUser,
        });
    } catch (error: any) {
        console.error("Error updating withdrawal:", error);
        return NextResponse.json(
            { success: false, error: error.message || "An error occurred while updating withdrawal" },
            { status: 500 }
        );
    }
}
