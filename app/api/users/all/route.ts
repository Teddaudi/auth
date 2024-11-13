// import { NextRequest, NextResponse } from "next/server";
// import User from "../../../../models/userModel";

// export const dynamic = 'force-dynamic';

// export async function GET(request: NextRequest) {
//     try {
//         // Parse query parameters for pagination
//         const { searchParams } = new URL(request.url);
//         const page = parseInt(searchParams.get("page") || "1", 10); // Default to page 1 if not provided
//         const limit = parseInt(searchParams.get("limit") || "10", 10); // Default to 10 items per page if not provided

//         // Calculate skip for pagination
//         const skip = (page - 1) * limit;

//         // Fetch paginated users and total count, excluding specified fields
//         const [users, totalUsers] = await Promise.all([
//             User.find()
//                 .skip(skip)
//                 .limit(limit)
//                 .select("-images -isAdmin -username -password -phone -address"), // Exclude fields
//             User.countDocuments(),
//         ]);

//         // Calculate total pages
//         const totalPages = Math.ceil(totalUsers / limit);

//         // Return paginated results with meta data
//         return NextResponse.json({
//             message: "Users found",
//             data: users,
//             meta: {
//                 totalUsers,
//                 totalPages,
//                 currentPage: page,
//                 pageSize: limit,
//             },
//         });
//     } catch (error: any) {
//         console.error("Error fetching users:", error);
//         return NextResponse.json(
//             { error: error.message || "An error occurred while fetching users" },
//             { status: 500 }
//         );
//     }
// }


import { NextRequest, NextResponse } from "next/server";
import User from "../../../../models/userModel";

export const dynamic = 'force-dynamic';

export async function GET(request: NextRequest) {
    try {
        // Parse query parameters for pagination
        const { searchParams } = new URL(request.url);
        const page = Math.max(1, parseInt(searchParams.get("page") || "1", 200)); // Default to page 1 if not provided
        const limit = Math.max(1, parseInt(searchParams.get("limit") || "200", 200)); // Default to 10 items per page if not provided

        // Calculate skip for pagination
        const skip = (page - 1) * limit;

        // Fetch paginated users and total count, excluding specified fields
        const [users, totalUsers] = await Promise.all([
            User.find()
                .skip(skip)
                .limit(limit)
                .select("-images -isAdmin -username -password -phone -address"), // Exclude fields
            User.countDocuments(),
        ]);

        // Calculate total pages based on totalUsers and limit
        const totalPages = Math.ceil(totalUsers / limit);
        
        // Check if the number of users is less than the limit to prevent page loss
        const currentPageItems = users.length;
        if (currentPageItems < limit && page < totalPages) {
            console.warn(`Warning: Expected ${limit} items, but got ${currentPageItems}. Check database or query filters.`);
        }

        // Return paginated results with meta data
        return NextResponse.json({
            message: "Users found",
            data: users,
            meta: {
                totalUsers,
                totalPages,
                currentPage: page,
                currentPageItems, // Number of items in the current page
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



