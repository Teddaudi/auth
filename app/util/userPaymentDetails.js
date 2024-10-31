import axios from 'axios';
import React, { useState } from 'react';
import toast from 'react-hot-toast';

const PaymentDetails = ({ setClose ,setOpen}) => {
    const [selectedCrypto, setSelectedCrypto] = useState('Select Cryptocurrency');
    const [showDropdown, setShowDropdown] = useState(false);
    const [widthdraw, setWithdraw] = useState(0)

    const handleCryptoChange = (crypto) => {
        setSelectedCrypto(crypto);
        setShowDropdown(false); // Close the dropdown after selection
    };

    const toggleDropdown = () => {
        setShowDropdown((prev) => !prev); // Toggle dropdown visibility
    };



    async function handleCashout() {
        try {
            const data = await axios.get('/api/users/me')
            const current = data.data.data.investment
            const totalWidrawal = current- widthdraw
            const res = await axios.put('/api/balance', {
                amount: totalWidrawal
            });
            if (res) {
                toast.success("Withdrawal Initiated!")
                setClose(false)
                setOpen(true)
            }
        } catch (error) {
            console.log(error.message)
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
                    onChange={(e) => setWithdraw(e.target.value)}
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
                        className="bg-green-600 text-white px-4 py-2 rounded-md hover:bg-green-700 transition"
                        onClick={handleCashout}
                    >
                        Proceed to Cashout
                    </button>
                </div>
            </div>
        </div>
    );
};

export default PaymentDetails;
