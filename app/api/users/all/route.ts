import { NextRequest, NextResponse } from "next/server";
import User from "../../../../models/userModel";

export const dynamic = 'force-dynamic';

export async function GET(request: NextRequest) {
    try {
        // Parse query parameters for pagination
        const { searchParams } = new URL(request.url);
        const page = Math.max(1, parseInt(searchParams.get("page") || "1", 200)); // Default to page 1 if not provided
        const limit = Math.max(1, parseInt(searchParams.get("limit") || "200", 200)); // Default to 200 items per page if not provided

        // Calculate skip for pagination
        const skip = (page - 1) * limit;

        // Fetch paginated users and total count, excluding specified fields
        const [users, totalUsers] = await Promise.all([
            User.find()
                .skip(skip)
                .limit(limit)
                .select("-isAdmin -username -password -phone -address"), // Exclude fields
            User.countDocuments(),
        ]);

        // Process users to convert images (if available) to base64
        const usersWithBase64Images = await Promise.all(
            users.map(async (user: any) => {
                if (user.frontIdImage) {
                    // Convert frontIdImage to base64 if it exists
                    const frontIdBase64 = user.frontIdImage.toString('base64');
                    user.frontIdImage = `data:image/png;base64,${frontIdBase64}`;
                }
                if (user.backIdImage) {
                    // Convert backIdImage to base64 if it exists
                    const backIdBase64 = user.backIdImage.toString('base64');
                    user.backIdImage = `data:image/png;base64,${backIdBase64}`;
                }
                return user;
            })
        );

        // Calculate total pages based on totalUsers and limit
        const totalPages = Math.ceil(totalUsers / limit);
        
        // Check if the number of users is less than the limit to prevent page loss
        const currentPageItems = usersWithBase64Images.length;
        if (currentPageItems < limit && page < totalPages) {
            console.warn(`Warning: Expected ${limit} items, but got ${currentPageItems}. Check database or query filters.`);
        }

        // Return paginated results with meta data
        return NextResponse.json({
            message: "Users found",
            data: usersWithBase64Images,
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
