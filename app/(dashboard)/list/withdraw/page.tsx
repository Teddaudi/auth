"use client";
import React, { useState } from "react";
import { useUser } from "../../../util/context/context";
import axios from "axios";

const Withdraw = () => {
  const data: any = useUser();
  const balance = data?.investment
  const [address, setAddress] = useState("")
  const [amount, setAmount] = useState("")

  async function withdrawInit() {
    if (!address) {
      console.log("Please enter a valid wallet address!");
      return;
    }

    if (!amount || isNaN(Number(amount)) || Number(amount) <= 0) {
      console.log("Please enter a valid amount!");
      return;
    }

    if (Number(amount) > balance) {
      console.log("Insufficient funds!");
      return;
    }

    try {
      // Deducting balance locally
      const totalWithdrawal = balance - Number(amount);

      // Initiating withdrawa l
      await axios.put('/api/users/withdrawal', {
        withdrawal: amount,
      });

      alert("Withdrawal successful!");

    } catch (error: any) {
      // console.error("Error during withdrawal:", error.message);
      alert("An error occurred while processing your withdrawal. Please try again.");
    }
  }

  return (
    <div className="max-w-[400px] w-full mx-auto p-4 bg-white shadow-md rounded-lg">
      <h2 className="text-2xl font-semibold text-gray-800 mb-4">Withdraw Funds</h2>
      <div className="flex justify-center text-center gap-4 bg-gray-100 p-4 rounded-md mb-4">
        <div className="text-lg text-gray-600">Current Balance :</div>
        <div className="text-lg font-bold text-green-300 hover:text-green-600 cursor-pointer">{balance || "N/A"}</div>
      </div>
      <form className="space-y-4">
        <div className="flex flex-col">
          <label
            htmlFor="wallet-address"
            className="text-sm font-semibold text-gray-700 mb-1"
          >
            Wallet Address
          </label>
          <input
            id="wallet-address"
            placeholder="Enter wallet address"
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-400"
            alt="address"
            onChange={e => setAddress(e.target.value)}
          />
        </div>
        <div className="flex flex-col">
          <label
            htmlFor="amount"
            className="text-sm font-semibold text-gray-700 mb-1"
          >
            Amount
          </label>
          <input
            id="amount"
            placeholder="Enter amount"
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-400"
            alt="Amount"
            onChange={e => setAmount(e.target.value)}
          />
        </div>
        <div className="flex justify-center">
          <button
            type="button" onClick={withdrawInit}
            className="max-w-[200px] w-full py-2 px-4 bg-green-300 hover:bg-green-600 hover:text-white text-green-800 font-semibold rounded-full focus:outline-none focus:ring-2 focus:ring-green-400"
          >
            Withdraw
          </button>
        </div>
      </form>
    </div>
  );
};

export default Withdraw;
