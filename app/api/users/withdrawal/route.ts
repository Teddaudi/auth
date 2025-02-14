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
            withdrawal: user.withdrawals,
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
//         // console.log(userBody)
//         const { withdrawal } = userBody;
//         if (!withdrawal) {
//             return NextResponse.json(
//                 { success: false, message: "Withdrawal value is required" },
//                 { status: 400 }
//             );
//         }

//         // const withdrawalString = String(withdrawal);
//         const withdrawalString = withdrawal;

//         const userId = await getDataFromToken(request);

//         const user = await User.findById(userId);
//         if (!user) {
//             return NextResponse.json(
//                 { success: false, message: "User not found" },
//                 { status: 404 }
//             );
//         }
//         const investment = user.investment;
//         // console.log(investment)
//         const newInvestment = investment - withdrawal;
//         // console.log(newInvestment)
//         const updatedUser = await User.findByIdAndUpdate(
//             userId,
//             {
//                 $push: { withdrawals: withdrawalString },
//                 $set: { investment: newInvestment },
//             },
//             { new: true }
//         );

//         return NextResponse.json({
//             success: true,
//             data: updatedUser,
//         });
//     } catch (error: any) {
//         // console.error("Error in PUT:", error);
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

        const withdrawalAmount = parseFloat(withdrawal);
        if (isNaN(withdrawalAmount) || withdrawalAmount <= 0) {
            return NextResponse.json(
                { success: false, message: "Withdrawal value must be a valid positive number" },
                { status: 400 }
            );
        }

        const userId = await getDataFromToken(request);
        const user = await User.findById(userId);
        if (!user) {
            return NextResponse.json(
                { success: false, message: "User not found" },
                { status: 404 }
            );
        }

        const currentInvestment = parseFloat(user.investment);
        if (isNaN(currentInvestment) || withdrawalAmount > currentInvestment) {
            return NextResponse.json(
                { success: false, message: "Insufficient investment balance" },
                { status: 400 }
            );
        }

        const newInvestment = currentInvestment - withdrawalAmount;

        const withdrawalEntry = {
            amount: withdrawalAmount.toString(),
            status: "pending", // Default status for new withdrawals
            date: new Date(), // Tracks when the withdrawal was made
        };
        const updatedUser = await User.findByIdAndUpdate(
            userId,
            {
                $push: { transactions: withdrawalEntry },
                $set: { investment: newInvestment.toString() },
            },
            { new: true }
        );

        return NextResponse.json({
            success: true,
            data: updatedUser,
        });
    } catch (error: any) {
        return NextResponse.json(
            { success: false, error: error.message || "An error occurred" },
            { status: 500 }
        );
    }
}