import { NextRequest, NextResponse } from "next/server";
import Wallet from "../../../models/userWallets";

export async function GET(request: NextRequest) {
    try {
        const { searchParams } = new URL(request.url);
        const name = searchParams.get('name');

        if (!name) {
            return NextResponse.json({ success: false, message: "Name is required" }, { status: 400 });
        }

        const wallet = await Wallet.find({ name: name });

        if (!wallet || wallet.length === 0) {
            return NextResponse.json({ success: true, wallets: [] }); // Return an empty array when not found
        }

        return NextResponse.json({
            success: true,
            wallets: wallet,
        });
    } catch (error:any) {
        console.error("Error in GET:", error);
        return NextResponse.json(
            { success: false, error: error.message || "An error occurred" },
            { status: 500 }
        );
    }
}


export async function POST(request: NextRequest) {
    try {
        // Parse the request body
        const userBody = await request.json();
        const { name, wallet } = userBody;
        // Validate the input
        if (!name || !wallet) {
            return NextResponse.json(
                { success: false, message: "Both 'name' and 'wallet' fields are required." },
                { status: 400 }
            );
        }

        // Save the wallet details to the database
        await Wallet.create({ name, wallet });

        // Success response
        return NextResponse.json({
            success: true,
            message: "Wallet created successfully!"
        });
    } catch (error: any) {
        // Error handling
        console.error("Error in wallet creation:", error);
        return NextResponse.json(
            { success: false, error: error.message || "An unexpected error occurred." },
            { status: 500 }
        );
    }
}

export async function PUT(request: NextRequest) {
    try {
        // Parse the incoming JSON body
        const userBody = await request.json();
        const { name, wallet } = userBody;

        // Validate that both name and wallet are provided
        if (!name || !wallet) {
            return NextResponse.json(
                { success: false, message: "Both 'name' and 'wallet' fields are required" },
                { status: 400 }
            );
        }

        // Update the wallet if it exists
        const updatedWallet = await Wallet.findOneAndUpdate(
            { name: name }, // Find wallet by 'name'
            { wallet: wallet }, // Update 'wallet' field
            { new: true } // Return the updated document
        );

        // If no wallet was found to update
        if (!updatedWallet) {
            return NextResponse.json(
                { success: false, message: "Wallet not found for the provided name" },
                { status: 404 }
            );
        }

        // Return success response
        return NextResponse.json({
            success: true,
            message: "Wallet updated successfully!",
            data: updatedWallet
        });
    } catch (error: any) {
        // Handle errors
        console.error("Error updating wallet:", error);
        return NextResponse.json(
            { success: false, error: error.message || "An error occurred" },
            { status: 500 }
        );
    }
}

