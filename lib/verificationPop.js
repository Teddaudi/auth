"use client";
import axios from 'axios';
import { useRouter } from 'next/navigation';
import React, { useEffect } from 'react';

const VerificationMessage = ({setVerificationMessages}) => {

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
    }, []);

    return (
        <div>
            <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
                <div className="bg-white rounded-lg shadow-lg w-96 p-6 space-y-4">
                    <p>
                        Please proceed and fund your trading account!
                    </p>
                    <div className="flex justify-between mt-4">
                        <button
                            onClick={()=>setVerificationMessages(false)}
                            className="bg-red-600 text-white px-4 py-2 rounded-md hover:bg-red-700 transition"
                        >
                            Close
                        </button>
                        {/* <button
                            // onClick={handleCashout}
                            className="bg-green-600 text-white px-4 py-2 rounded-md hover:bg-green-700 transition"
                        >
                            Proceed to Cashout
                        </button> */}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default VerificationMessage;
