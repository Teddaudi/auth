import { connect } from "../../../../../dbConfig/dbConfig"
import { getDataFromToken } from "../../../../../helpers/getDataFromToken"
import User from "../../../../../models/userModel"
import { NextRequest, NextResponse } from "next/server"


connect()

export async function PUT(request: NextRequest) {
    try {
        const reqBody = await request.json()
        const { deposit, userId } = reqBody;
        const userUpdate = await User.findByIdAndUpdate({_id: userId }, { investment: deposit })
        return NextResponse.json({
            message: "User details updated successfully",
            data: userUpdate
        })
    } catch (error: any) {
        return NextResponse.json({ error: error.message },
            { status: 500 }
        )
    }
}