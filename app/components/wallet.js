"use client"

import axios from "axios"
import { useState } from "react"
import toast from "react-hot-toast"

export default function CreateWallet() {
    const [name, setName] = useState("")
    const [wallet, setWallet] = useState("")
  
    async function handleSubmit() {
        try {
            // Validate that both name and wallet are provided
            if (!name || !wallet) {
                return alert("Provide all necessary details!");
            }
    
            // Fetch existing wallet by name
            const { data: existingWallet } = await axios.get(`/api/wallets?name=${name}`);
    
            // Check if the wallet exists
            if (!existingWallet || existingWallet.wallets.length === 0) {
                // If wallet doesn't exist, create a new one
                const response = await axios.post("/api/wallets", {
                    name: name, wallet: wallet
                });
    
                if (response.data.success) {
                    return alert("Wallet created successfully!");
                } else {
                    alert("Wallet creation failed!");
                }
            } else {
                // If wallet exists, update it
                const response = await axios.put("/api/wallets", {
                    name: name, wallet: wallet
                });
    
                if (response.data.success) {
                    return alert("Wallet updated successfully!");
                } else {
                    alert("Failed to update wallet.");
                }
            }
        } catch (error) {
            console.error("Error during wallet submission:", error.message);
            alert(error.response?.data?.message || "An unexpected error occurred.");
        }
    }
    
    
    return (
        <form className="flex flex-col border message shadow-xl rounded w-full" >
            <label className="mt-4 mx-4">Wallet Name</label>
            <input className="mt-4 mx-4 border rounded-sm py-2 px-1" placeholder="Client email address" onChange={(e) => setName(e.target.value)} />
            <label className="mt-4 mx-4">Address</label>
            <input className="mt-4 mx-4 border rounded-sm py-2 px-1" placeholder="Subject" onChange={(e) => setWallet(e.target.value)} />
            <input value="Send Message" type="button" className="bg-green-300 max-w-[300px] mx-auto px-4 py-2 rounded-md cursor-pointer text-white 
            hover:bg-green-700 my-4
            "
                onClick={handleSubmit}
            />
        </form>
    )
}