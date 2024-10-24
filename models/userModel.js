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
        default:"Provide your full name"
    },
    phone: {
        type: String,
        default:"Provide your phone number"
    },
    address: {
        type: String,
        default:"Provide your address"
    },
    investment: {
        type: String,
        default:"Provide your investment"
    },
    idVerification: {
        type: Boolean,
        default: false,
    },
    image: {
        type: Buffer, 
        default:null
    },
    avatar:{
        type:Buffer
    }
});

const User = mongoose.models.User || mongoose.model("User", userSchema);
export default User;
