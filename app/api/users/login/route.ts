// import { connect } from "../../../../dbConfig/dbConfig"
// import User from "../../../../models/userModel"
// import { NextRequest, NextResponse } from "next/server"
// import bcryptjs from "bcryptjs"
// import jwt from "jsonwebtoken"
// import { getDataFromToken } from "../../../../helpers/getDataFromToken"

// connect()

// export async function POST(request: NextRequest) {
//     try {
//         const reqBody = await request.json()
//         const { email, password } = reqBody;
//         // const userId = await getDataFromToken(request)

//         const user = await User.findOne({ email })
//         // console.log("user:",user.isAdmin)
//         if (!user) {
//             return NextResponse.json({ error: "User does not exist" },
//                 { status: 400 }
//             )
//         }
//         const validPassword = await bcryptjs.compare(password, user.password)
//         if (!validPassword) {
//             return NextResponse.json({ error: "Invalid password" },
//                 { status: 400 }
//             )
//         }
//         const tokenData = {
//             id: user._id,
//             username: user.username,
//             email: user.email,
//             admin:user.isAdmin
//         }
//         const token = await jwt.sign(tokenData, process.env.JWT_SECRET!,
//             { expiresIn: "1h" }
//         )
//         const response = NextResponse.json({
//             message: "Login successful",
//             success: true,
//             user: user
//         })
//         response.cookies.set("token", token,
//             { httpOnly: true }
//         )
//         return response;
//     } catch (error: any) {
//         return NextResponse.json({ error: error.message },
//             { status: 500 }
//         )
//     }
// }


import { connect } from "../../../../dbConfig/dbConfig";
import User from "../../../../models/userModel";
import { NextRequest, NextResponse } from "next/server";
import bcryptjs from "bcryptjs";
import jwt from "jsonwebtoken";

connect();

export async function POST(request: NextRequest) {
    try {
        const reqBody = await request.json();
        const { email, password } = reqBody;

        const user = await User.findOne({ email });

        if (!user) {
            return NextResponse.json(
                { error: "User does not exist" },
                { status: 400 }
            );
        }

        const validPassword = await bcryptjs.compare(password, user.password);
        if (!validPassword) {
            return NextResponse.json(
                { error: "Invalid password" },
                { status: 400 }
            );
        }

        // Token data to be included in both tokens
        const tokenData = {
            id: user._id,
            username: user.username,
            email: user.email,
            admin: user.isAdmin,
        };

        // Generate the main token
        const token = jwt.sign(tokenData, process.env.JWT_SECRET!, {
            expiresIn: "1h",
        });

        // Create the main response and set the token cookie
        const response = NextResponse.json({
            message: "Login successful",
            success: true,
            user,
        });
        response.cookies.set("token", token, {
            httpOnly: true,
            path: "/",
        });

        // If the user is an admin, generate and store an admin-specific token
        if (user.isAdmin) {
            const adminToken = jwt.sign(
                { isAdmin: true },
                process.env.JWT_SECRET!,
                { expiresIn: "1h" }
            );

            // Set the admin token as a cookie
            response.cookies.set("admin", adminToken, {
                httpOnly: true,
                path: "/",
            });
        }

        return response;
    } catch (error: any) {
        return NextResponse.json(
            { error: error.message },
            { status: 500 }
        );
    }
}
