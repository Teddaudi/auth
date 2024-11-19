// import { NextRequest, NextResponse } from "next/server";
// import { getDataFromToken } from "../../../../helpers/getDataFromToken";
// import User from "../../../../models/userModel";


// export async function GET(request: NextRequest) {
//     try {
//         const userId = await getDataFromToken(request);
//         const user = await User.findOne({ _id: userId }).select("-password");
//         const userWithdrawal = user;
//         return NextResponse.json({
//             success: true,
//             withdrawal: userWithdrawal
//         })
//     } catch (error: any) {
//         NextResponse.json(error.message)
//     }
// }

// export async function PUT(request: NextRequest) {
//     try {
//         // Parse the request body
//         const userBody = await request.json();
//         let { withdrawal } = userBody;

//         // Convert withdrawal to a string (ensures it's always treated as a string)
//         withdrawal = String(withdrawal);

//         console.log("withdrawal:", withdrawal, typeof withdrawal);  // Log to confirm it's a string

//         // Retrieve the user ID from the token
//         const userId = await getDataFromToken(request);

//         // Check if the user exists
//         const user = await User.findById(userId);
//         if (!user) {
//             return NextResponse.json({ success: false, message: "User not found" }, { status: 404 });
//         }

//         // Update the user’s withdrawal value and return the updated document
//         const updatedUser = await User.findByIdAndUpdate(
//             userId,
//             { withdrawal: withdrawal },  // Pass withdrawal as a string
//             { new: true }    // Ensure the updated document is returned
//         );


//         // Check if the user was updated
//         if (!updatedUser) {
//             return NextResponse.json({ success: false, message: "Failed to update withdrawal" }, { status: 400 });
//         }

//         // Return a successful response with the updated user data
//         return NextResponse.json({
//             success: true,
//             data: updatedUser,
//         });
//     } catch (error: any) {
//         console.error("Error updating withdrawal:", error);
//         return NextResponse.json(
//             { success: false, error: error.message || "An error occurred while updating withdrawal" },
//             { status: 500 }
//         );
//     }
// }

import { NextRequest, NextResponse } from "next/server";
import { getDataFromToken } from "../../../../helpers/getDataFromToken";
import User from "../../../../models/userModel";

export async function GET(request: NextRequest) {
    try {
        const userId = await getDataFromToken(request);
        const user = await User.findOne({ _id: userId }).select("-password");
        if (!user) {
            return NextResponse.json({ success: false, message: "User not found" }, { status: 404 });
        }
        return NextResponse.json({
            success: true,
            withdrawal: user.withdrawal,
        });
    } catch (error: any) {
        console.error("Error in GET:", error);
        return NextResponse.json(
            { success: false, error: error.message || "An error occurred" },
            { status: 500 }
        );
    }
}

// export async function PUT(request: NextRequest) {
//     try {
//         const userBody = await request.json();
//         let { withdrawal } = userBody;

//         withdrawal = String(withdrawal);

//         const userId = await getDataFromToken(request);

//         const user = await User.findById(userId);
//         if (!user) {
//             return NextResponse.json({ success: false, message: "User not found" }, { status: 404 });
//         }

//         const updatedUser = await User.findByIdAndUpdate(
//             userId,
//             { withdrawal },
//             { new: true }
//         );

//         if (!updatedUser) {
//             return NextResponse.json({ success: false, message: "Failed to update withdrawal" }, { status: 400 });
//         }

//         return NextResponse.json({
//             success: true,
//             data: updatedUser,
//         });
//     } catch (error: any) {
//         console.error("Error in PUT:", error);
//         return NextResponse.json(
//             { success: false, error: error.message || "An error occurred" },
//             { status: 500 }
//         );
//     }
// }


export async function PUT(request: NextRequest) {
    try {
        const userBody = await request.json();
        const { withdrawal } = userBody;

        if (!withdrawal) {
            return NextResponse.json(
                { success: false, message: "Withdrawal value is required" },
                { status: 400 }
            );
        }

        const withdrawalString = String(withdrawal);
        const userId = await getDataFromToken(request);

        const user = await User.findById(userId);
        if (!user) {
            return NextResponse.json(
                { success: false, message: "User not found" },
                { status: 404 }
            );
        }

        // Ensure the `withdrawals` field is initialized as an array
        if (!user.withdrawal || !Array.isArray(user.withdrawal)) {
            user.withdrawal = []; // Initialize as an empty array
        }
        // Append the new withdrawal value to the array
        user.withdrawal.push(withdrawalString);

        // Save the updated user
        await user.save();

        return NextResponse.json({
            success: true,
            data: user,
        });
    } catch (error: any) {
        console.error("Error in PUT:", error);
        return NextResponse.json(
            { success: false, error: error.message || "An error occurred" },
            { status: 500 }
        );
    }
}

