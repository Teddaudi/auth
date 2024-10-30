import { NextRequest } from "next/server";
import { getDataFromToken } from "./getDataFromToken";
import User from "../models/userModel"; // Ensure the path is correct

export const adminStatus = async (request: NextRequest) => {
    try {
        const userId = await getDataFromToken(request);
        console.log("User ID:", userId); // Debugging line
        if (!userId) {
            return false; // If userId is not found, return false
        }

        const user = await User.findById(userId); // Pass userId directly, no need for { _id: userId }
        console.log("User:", user); // Debugging line
        return user ? user.isAdmin : false; // Check if user exists and return admin status
    } catch (error: any) {
        console.error("Error fetching admin status:", error); // Log the error for debugging
        throw new Error(error.message);
    }
};
