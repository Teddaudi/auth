// import { NextResponse } from "next/server";


// export async function GET() {
//     try {
//         const response = NextResponse.json({
//             message: "Logout succesful",
//             success: true
//         })
//         response.cookies.set("token", "", {
//             httpOnly: true,
//             expires: new Date(0)
//         })
//         return response;
//     } catch (error: any) {
//         return NextResponse.json({ error: error.message },
//             { status: 500 }
//         )
//     }
// }
import { NextResponse } from "next/server";

export async function GET() {
    try {
        const response = NextResponse.json({
            message: "Logout successful",
            success: true,
        });
        
        // Clear the "token" cookie
        response.cookies.set("token", "", {
            httpOnly: true,
            expires: new Date(0), // Expire immediately
            path: "/", // Ensures it's removed across the app
        });

        // Clear the "admin" cookie
        response.cookies.set("admin", "", {
            httpOnly: true,
            expires: new Date(0), // Expire immediately
            path: "/", // Ensures it's removed across the app
        });

        return response;
    } catch (error: any) {
        return NextResponse.json(
            { error: error.message },
            { status: 500 }
        );
    }
}
