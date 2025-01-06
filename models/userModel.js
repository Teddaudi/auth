import mongoose from "mongoose";
import { type } from "os";

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        unique: true,
    },
    email: {
        type: String,
        unique: true,
    },
    password: {
        type: String,
    },
    isVerified: {
        type: Boolean,
        default: false,
    },
    isAdmin: {
        type: Boolean,
        default: false,
    },
    fullName: {
        type: String,
        default: "Provide your full name"
    },
    phone: {
        type: String,
        default: "Provide your phone number"
    },
    address: {
        type: String,
        default: "Provide your address"
    },
    investment: {
        type: String,
        default: "Provide your investment"
    },
    idVerification: {
        type: Boolean,
        default: false,
    },
    images: {
        frontIdImage: {
            type: Buffer, // Buffer for the front ID image
            default: null,
        },
        backIdImage: {
            type: Buffer, // Buffer for the back ID image
            default: null,
        },
    },
    image: {
        type: Buffer,
        default: null
    },
    avatar: {
        type: Buffer
    },
    withdrawal: {
        type: String,
        default: "0"
    },
    withdrawals: {
        type: [String], 
        default: [], 
    },
    transactions: {
        type: [
            {
                amount: {
                    type: String,
                    required: true, // Ensures amount is provided
                },
                status: {
                    type: String,
                    default: "pending", // Default value for each withdrawal's status
                },
                date: {
                    type: Date,
                    default: Date.now, // Tracks when the withdrawal was made
                }
            }
        ],
        default: [],
    },
});

const User = mongoose.models.User || mongoose.model("User", userSchema);
export default User;
