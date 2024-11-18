import mongoose from "mongoose";

const verificationSchema = new mongoose.Schema({
    email: {
        type: String,
        unique: true,
        required: true, // Adding validation to ensure email is provided
    },
    idVerification: {
        type: Boolean,
        default: false,
    },
    images: {
        type: [Buffer], // Change from a single Buffer to an array of Buffers
        default: [], // Initialize as an empty array
    },
});

const Verification = mongoose.models.Verification || mongoose.model("Verification", verificationSchema);
export default Verification;
