import axios from 'axios';
import React, { useState } from 'react';
import toast from 'react-hot-toast';

const PaymentDetails = ({ setClose, setOpen, setMoney }) => {
    const [selectedCrypto, setSelectedCrypto] = useState('Select Cryptocurrency');
    const [showDropdown, setShowDropdown] = useState(false);
    const [widthdraw, setWithdraw] = useState(0);
    const [loading, setLoading] = useState(false);  // Loading state

    const handleCryptoChange = (crypto) => {
        setSelectedCrypto(crypto);
        setShowDropdown(false);
    };

    const toggleDropdown = () => {
        setShowDropdown((prev) => !prev);
    };

    async function handleCashout() {
        setLoading(true);  // Set loading to true before the request
        try {
            const data = await axios.get('/api/users/me');
            const current = data.data.data.investment;

            if (Number(widthdraw) > current) {
                toast.error("Insufficient funds!");
                setLoading(false);  // Stop loading if insufficient funds
                return;
            }

            const totalWithdrawal = current - Number(widthdraw);
            const res = await axios.put('/api/balance', {
                amount: totalWithdrawal
            });

            if (res) {
                toast.success("Withdrawal Initiated!");
                setClose(false);
                setMoney(Number(widthdraw));
                setOpen(true);
            }
        } catch (error) {
            console.log(error.message);
            toast.error("An error occurred. Please try again.");
        } finally {
            setLoading(false);  // Stop loading after the request completes
        }
    }

    return (
        <div className="fixed inset-0 bg-black bg-opacity-60 flex justify-center items-center z-50">
            <div className="bg-white rounded-lg shadow-lg w-96 p-8 space-y-4">
                <h2 className="text-lg font-semibold text-gray-800 text-center">Cashout Details</h2>

                <label className="block text-gray-700 font-medium">Wallet Address</label>
                <input
                    type="text"
                    placeholder="Your wallet address"
                    className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
                />

                <label className="block text-gray-700 font-medium">Cryptocurrency</label>
                <div className="relative">
                    <button
                        onClick={toggleDropdown}
                        className="w-full px-4 py-2 border rounded-md text-gray-700 text-left bg-gray-100 focus:outline-none focus:ring-2 focus:ring-green-500"
                    >
                        {selectedCrypto}
                    </button>
                    {showDropdown && (
                        <div className="absolute w-full bg-white border rounded-md mt-1 shadow-lg z-10">
                            <ul className="space-y-1">
                                {['LTC', 'BTC', 'ETH', 'USDT (TRC20)'].map((crypto) => (
                                    <li
                                        key={crypto}
                                        onClick={() => handleCryptoChange(crypto)}
                                        className="px-4 py-2 cursor-pointer hover:bg-gray-100 text-gray-700"
                                    >
                                        {crypto}
                                    </li>
                                ))}
                            </ul>
                        </div>
                    )}
                </div>

                <label className="block text-gray-700 font-medium">Amount</label>
                <input
                    type="number"
                    placeholder="Enter amount"
                    onChange={(e) => setWithdraw(Number(e.target.value))}
                    className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
                />

                <div className="flex justify-end space-x-4 mt-6">
                    <button
                        className="bg-red-600 text-white px-4 py-2 rounded-md hover:bg-red-700 transition"
                        onClick={() => setClose(false)}
                    >
                        Close
                    </button>
                    <button
                        className={`bg-green-600 text-white px-4 py-2 rounded-md hover:bg-green-700 transition ${loading ? 'opacity-50 cursor-not-allowed' : ''}`}
                        onClick={handleCashout}
                        disabled={loading}  // Disable button while loading
                    >
                        {loading ? "Processing..." : "Proceed to Cashout"}
                    </button>
                </div>
            </div>
        </div>
    );
};

export default PaymentDetails;
