// import { NextRequest ,NextResponse} from "next/server";
// import User from "../../../../models/userModel";

// export async function GET(request: NextRequest){
// try {
//     const users  = await User.find()
//     // console.log("users:",users)
//     return NextResponse.json({
//         message: "Users found",
//         data:users
//     })
// } catch (error:any) {
//     return NextResponse.json({
//         error: error.message
//     })
// }
// }


import { NextRequest, NextResponse } from "next/server";
import User from "../../../../models/userModel";

export async function GET(request: NextRequest) {
    try {
        // Parse query parameters for pagination
        const { searchParams } = new URL(request.url);
        const page = parseInt(searchParams.get("page") || "1", 10); // Default to page 1 if not provided
        const limit = parseInt(searchParams.get("limit") || "10", 10); // Default to 10 items per page if not provided

        // Calculate skip for pagination
        const skip = (page - 1) * limit;

        // Fetch paginated users and total count
        const [users, totalUsers] = await Promise.all([
            User.find().skip(skip).limit(limit),
            User.countDocuments(),
        ]);

        // Calculate total pages
        const totalPages = Math.ceil(totalUsers / limit);

        // Return paginated results with meta data
        return NextResponse.json({
            message: "Users found",
            data: users,
            meta: {
                totalUsers,
                totalPages,
                currentPage: page,
                pageSize: limit,
            },
        });
    } catch (error: any) {
        console.error("Error fetching users:", error);
        return NextResponse.json(
            { error: error.message || "An error occurred while fetching users" },
            { status: 500 }
        );
    }
}
