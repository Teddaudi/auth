// "use client"
// import Link from 'next/link'
// import React from 'react'
// import { BsCashCoin } from "react-icons/bs";

// const Page = ({ searchParams }) => {
//     const balance = searchParams.balance || '0';

//     return (
//         <div className="flex items-center justify-center min-h-screen text-center">
//             <div className="flex flex-col items-center max-w-xs pl-10 pr-10 py-4 rounded-lg space-y-6">
//                 <div className='mb-4'>
//                     <h1 className='font-extrabold text-lg'>Total Cashout: £{balance}</h1>
//                 </div>
//                 <BsCashCoin size={85} className="text-green-500" />
//                 <p className="mt-2 font-bold text-green-500 text-lg">Loading transaction...</p>
//             </div>
//         </div>
//     );
// };

// export default Page;
"use client";
import Link from 'next/link';
import React from 'react';
import { BsCashCoin } from "react-icons/bs";

interface SearchParams {
    balance?: string;
}

const Page: React.FC<{ searchParams: SearchParams }> = ({ searchParams }) => {
    const balance = searchParams.balance || '0';

    return (
        <div className="flex items-center justify-center min-h-screen text-center">
            <div className="flex flex-col items-center max-w-xs pl-10 pr-10 py-4 rounded-lg space-y-6">
                <div className='mb-4'>
                    <h1 className='font-extrabold text-lg'>Total Cashout: £{balance}</h1>
                </div>
                <BsCashCoin size={85} className="text-green-500" />
                <p className="mt-2 font-bold text-green-500 text-lg">Loading transaction...</p>
            </div>
        </div>
    );
};

export default Page;
