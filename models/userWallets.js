import mongoose from "mongoose";

const userWallet = new mongoose.Schema({
    name: {
        type: String,
        unique: true,
    },
   wallet: {
    type: String,
    unique: true,
}
});

const Wallet = mongoose.models.Wallet || mongoose.model("Wallet", userWallet);
export default Wallet;
