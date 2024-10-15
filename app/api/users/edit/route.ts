import { connect } from "../../../../dbConfig/dbConfig"
import User from "../../../../models/userModel"
import { NextRequest, NextResponse } from "next/server"


connect()

export async function PUT(request:NextRequest) {
    try {
        const reqBody = await request.json()
        console.log("reqBody:",reqBody)
        const {fullName,phone,address,investment} =reqBody;
        const userUpdate = new User({
            fullName,
            phone,
            address,
            investment
        })
        await userUpdate.save()
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