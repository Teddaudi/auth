"use client";
import axios from 'axios';
import { useRouter } from 'next/navigation';
import React, { useEffect } from 'react';

const Popup = ({ setOpen,money }) => {
    const router = useRouter();

    const handleClick = () => {
        setOpen(false);
    };

    async function handleCashout() {
        // const data = await axios.get('/api/users/me')
        //     const current = data.data.data.investment
        setOpen(false)
    }

    // Close the popup on Escape key press
    useEffect(() => {
        const handleKeyDown = (e) => {
            if (e.key === 'Escape') {
                setOpen(false);
            }
        };

        window.addEventListener('keydown', handleKeyDown);

        return () => {
            window.removeEventListener('keydown', handleKeyDown);
        };
    }, [setOpen]);

    return (
        <div>
            <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
                <div className="bg-white rounded-lg shadow-lg w-96 p-6 space-y-4">
                    <p>
                        Please proceed with the deposit of the 10% one-time refundable linkage fee. This will link your receiving details to the system,
                        allowing you to withdraw your funds. Once your details are linked, you can proceed to withdraw.
                    </p>
                    <p>
                        Let me know once the step is complete!
                    </p>
                    <div className="flex justify-between mt-4">
                        <button
                            onClick={handleClick}
                            className="bg-red-600 text-white px-4 py-2 rounded-md hover:bg-red-700 transition"
                        >
                            Close
                        </button>
                        <button
                            onClick={handleCashout}
                            className="bg-green-600 text-white px-4 py-2 rounded-md hover:bg-green-700 transition"
                        >
                            Proceed to Cashout
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Popup;
