import { connect } from "../../../../dbConfig/dbConfig"
import User from "../../../../models/userModel"
import { NextRequest, NextResponse } from "next/server"
import bcryptjs from "bcryptjs"

connect()

export async function POST(request: NextRequest) {
    try {
        const reqBody = await request.json()
        const { username, email, password } = reqBody;
        const user = await User.findOne({ email })
        if (user) {
            return NextResponse.json({ error: "User already exists" },
                { status: 400 }
            )
        }
        const salt = await bcryptjs.genSalt(10)
        const hashedPassword = await bcryptjs.hash(password, salt)
        const newUSer = new User({
            username,
            email,
            password: hashedPassword
        })
        // console.log("signUp:", newUSer)
        await newUSer.save()
        return NextResponse.json({
            message: "User created successfully",
            success: true
        })
    } catch (error: any) {
        // console.log("SignupError:", error.message)
        return NextResponse.json({ error: error.message },
            { status: 500 }
        )
    }
}