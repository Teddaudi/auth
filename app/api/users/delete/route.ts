import { connect } from "../../../../dbConfig/dbConfig";
import User from "../../../../models/userModel";
import { NextRequest, NextResponse } from "next/server";

connect();

export async function DELETE(request: NextRequest) {
    try {
        const reqBody = await request.json();
        const { userId } = reqBody;

        // Deleting the user using findByIdAndDelete directly with userId
        await User.findByIdAndDelete(userId);

        return NextResponse.json({
            message: "User deleted successfully",
        });
    } catch (error: any) {
        return NextResponse.json(
            { error: error.message },
            { status: 500 }
        );
    }
}
