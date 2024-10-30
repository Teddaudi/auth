"use client";
import { useRouter } from 'next/navigation';
import React, { useEffect } from 'react';

const Popup = ({ setClose, balance }) => {
    const router = useRouter();

    const handleClick = () => {
        setClose(false);
    };
function handleCahout(){
    router.push(`/cashout?balance=${balance}`);

}
    // Close the popup on Escape key press
    useEffect(() => {
        const handleKeyDown = (e) => {
            if (e.key === 'Escape') {
                setClose(false);
            }
        };

        window.addEventListener('keydown', handleKeyDown);

        return () => {
            window.removeEventListener('keydown', handleKeyDown);
        };
    }, [setClose]);

    return (
        <div>
            <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
                <div className="bg-white rounded-lg shadow-lg w-96 p-6">
                    <p>
                        Please proceed with the deposit of the 10% one-time refundable linkage fee. This will link your receiving details to the system,
                        allowing you to withdraw your funds. Once your details are linked, you can proceed to withdraw.
                    </p>
                    <p>
                        Let me know once the step is complete!
                    </p>
                    <button
                        onClick={handleClick}
                        className="bg-red-600 mt-2 px-4 py-1 rounded cursor-pointer"
                    >
                        Close
                    </button>
                    <button
                        onClick={handleCahout}
                        className="bg-green-600 mt-2 px-4 py-1 rounded cursor-pointer"
                    >
                        Proceed to Cashout
                    </button>
                </div>
            </div>
        </div>
    );
};

export default Popup;
