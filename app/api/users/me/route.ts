import { getDataFromToken } from "../../../../helpers/getDataFromToken";

import { NextRequest, NextResponse } from "next/server";
import User from "../../../../models/userModel";
import { connect } from "../../../../dbConfig/dbConfig";

connect()

export async function GET(request: NextRequest) {
    try {
        const userId = await getDataFromToken(request);
        const user = await User.findOne({ _id: userId }).select("-password");
        console.log("userMe:", user.isAdmin)
        return NextResponse.json({
            message: "User found",
            data: user
        })
    } catch (error: any) {
        return NextResponse.json({ error: error.message },
            { status: 500 }
        )
    }
}

export async function POST(request: NextRequest) {
    try {
        const reqBody = await request.json();
        const userId = await getDataFromToken(request);
        const { fullName, phone, address, investment } = reqBody;

        // Find the user and update or add the new fields
        const user = await User.findById(userId);

        if (!user) {
            return NextResponse.json({
                message: "User not found",
                success: false
            }, { status: 404 });
        }

        // Update the fields only if they are provided
        if (fullName) user.fullName = fullName;
        if (phone) user.phone = phone;
        if (address) user.address = address;
        if (investment) user.investment = investment;

        // Save the updated user data
        await user.save();

        return NextResponse.json({
            message: "User details added successfully",
            success: true,
            data: user
        });
    } catch (error: any) {
        return NextResponse.json(
            { error: error.message },
            { status: 500 }
        );
    }
}


export async function PUT(request: NextRequest) {
    try {
        const reqBody = await request.json();
        const userId = await getDataFromToken(request);
        const { fullName, phone, address, investment } = reqBody;

        const updatedFields = {
            ...(fullName && { fullName }),
            ...(phone && { phone }),
            ...(address && { address }),
            ...(investment && { investment })
        };

        const user = await User.findByIdAndUpdate(userId, updatedFields, {
            new: true,
            runValidators: true
        });

        if (!user) {
            return NextResponse.json({
                message: "User not found",
                success: false
            }, { status: 404 });
        }

        return NextResponse.json({
            message: "User details updated successfully",
            success: true,
            data: user
        });
    } catch (error: any) {
        return NextResponse.json({ error: error.message },
            { status: 500 }
        );
    }
}



