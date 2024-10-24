import mongoose from "mongoose";
import { type } from "os";

const verificationSchema = new mongoose.Schema({
    email: {
        type: String,
        unique: true,
    },
    idVerification: {
        type: Boolean,
        default: false,
    },
    image: {
        type: Buffer, 
        default:null
    }
});

const Verification = mongoose.models.Verification || mongoose.model("Verification", verificationSchema);
export default Verification;
