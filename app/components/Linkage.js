"use client";
import axios from 'axios';
import { useRouter } from 'next/navigation';
import React, { useEffect } from 'react';

const Linkage = ({ setOpenLinkage }) => {
    const router = useRouter();

    const handleClick = () => {
        setOpenLinkage(false);
    };

    async function handleCashout() {
        // const data = await axios.get('/api/users/me')
        //     const current = data.data.data.investment
        setOpenLinkage(false)
    }

    // Close the Linkage on Escape key press
    useEffect(() => {
        const handleKeyDown = (e) => {
            if (e.key === 'Escape') {
                setOpenLinkage(false);
            }
        };

        window.addEventListener('keydown', handleKeyDown);

        return () => {
            window.removeEventListener('keydown', handleKeyDown);
        };
    }, [setOpenLinkage]);

    return (
        <div>
            <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
                <div className="bg-white rounded-lg shadow-lg w-96 p-6 space-y-4">
                    <p>
                        First proceed with the payment of the one time refundable linkage fee then proceed to withdraw.
                    </p>
                    {/* <p>
                        Let me know once the step is complete!
                    </p> */}
                    <div className="flex justify-between mt-4">
                        <button
                            onClick={() => setOpenLinkage(false)}
                            className="bg-red-600 text-white px-4 py-2 rounded-md hover:bg-red-700 transition"
                        >
                            Close
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Linkage;
