"use client";
import React from "react";
import { useUser } from "../../../util/context/context";

const Transactions = () => {
  const data: any = useUser();
  // const transactions = data?.withdrawals || []; // Safely access withdrawals or default to an empty array
  const transaction = data?.transactions || [];
  return (
    <div className="bg-white p-6 rounded-lg shadow-md flex-1 m-4 mt-0">
      <div className="mt-6">
        <h2 className="text-xl font-bold text-gray-900 border-b pb-2 mb-6">
          Withdrawal History
        </h2>
        {transaction.length > 0 ? (
          <ul className="space-y-4">
            {transaction.map((transaction: any, index: number) => (
              <li
                key={index}
                className="flex flex-col sm:flex-row justify-between items-start sm:items-center bg-gray-50 hover:bg-gray-100 transition duration-300 ease-in-out rounded-lg px-5 py-4 shadow-sm border"
              >
                {/* Withdrawal Info */}
                <div className="w-full sm:w-auto mb-2 sm:mb-0">
                  <span className="block text-gray-600 text-sm font-medium">
                    Withdrawal #{index + 1}
                  </span>
                </div>

                {/* Status Badge */}
                <div
                  className={`rounded-full px-5 py-1 text-center text-sm font-semibold text-white mb-2 sm:mb-0 sm:ml-4 ${transaction.status === "Completed"
                      ? "bg-green-500"
                      : "bg-yellow-500"
                    }`}
                >
                  {transaction.status || "Pending"}
                </div>

                {/* Amount */}
                <p className="text-gray-900 font-semibold text-lg sm:ml-4">
                  £ {transaction.amount || transaction}
                </p>
              </li>
            ))}
          </ul>
        ) : (
          <div className="flex justify-center items-center h-24">
            <p className="text-gray-500 text-sm text-center">
              No transactions made!
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Transactions;
