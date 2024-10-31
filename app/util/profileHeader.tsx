"use client";
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Link from 'next/link';
import toast from 'react-hot-toast';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import Popup from '../../lib/popup';
import PaymentDetails from '../util/userPaymentDetails'


interface HeaderUserProps {
    username: string;
    image: any;
    avatarImg: any;
    balance: number; // Define balance as a number type for clarity
}

const HeaderUser: React.FC<HeaderUserProps> = ({ username, image, avatarImg, balance }) => {
    const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);
    const [close, setClose] = useState(false); // Start with false to hide popup initially
    const [open,setOpen]= useState(false)
    const router = useRouter();

    const logOut = async () => {
        try {
            await axios.get('/api/users/logout');
            toast.success('Logout successful');
            router.push('/signin');
        } catch (error: any) {
            toast.error(error.message);
        }
    };

    const handleCheckout = () => {
        setClose(true); // Open the popup when "Withdraw" is clicked
    };

    useEffect(() => {
        const handleOutsideClick = (e: any) => {
            if (!e.target.closest('.dropdown-container')) {
                setIsDropdownOpen(false);
            }
        };
        if (isDropdownOpen) {
            document.addEventListener('click', handleOutsideClick);
        }
        return () => {
            document.removeEventListener('click', handleOutsideClick);
        };
    }, [isDropdownOpen]);

    const toggleSidebar = () => {
        setIsSidebarCollapsed(prev => !prev);
    };

    const toggleUserDropdown = () => {
        setIsDropdownOpen(prev => !prev);
    };

    return (
        <header className="h-14 bg-gray-100 top-0 w-full fixed shadow mb-[36px]" style={{ zIndex: 10 }}>
            <div className="flex justify-between items-center px-10 h-14">
                <div className="flex justify-between items-center gap-x-14">
                    <div className="w-40">
                        <h2 className="text-gray-400 text-[18px]">Welcome</h2>
                        <p className="text-md font-bold">{username}</p>
                    </div>
                </div>

                <ul className="flex items-center gap-5">
                    <li className="relative dropdown-container" onClick={toggleUserDropdown}>
                        <Image
                            className="inline-block h-8 w-8 rounded-full ring-2 ring-white cursor-pointer"
                            src={image || avatarImg}
                            alt="User avatar"
                            width={32}
                            height={32}
                            objectFit="cover"
                        />
                        <ul
                            className={`absolute ${isDropdownOpen ? 'block' : 'hidden'} bg-white right-0 top-12 w-28 rounded shadow-md z-20`}
                        >
                            {balance > 0 && (
                                <li className="mb-1 hover:bg-gray-50 text-gray-700 hover:text-gray-900">
                                    <button
                                        className="block px-5 py-2 w-full text-left"
                                        onClick={handleCheckout}
                                    >
                                        Withdraw
                                    </button>
                                </li>
                            )}
                            <li className="mb-1 hover:bg-gray-50 text-gray-700 hover:text-gray-900">
                                <button className="block px-5 py-2 w-full text-left" onClick={logOut}>
                                    Logout
                                </button>
                            </li>
                        </ul>
                    </li>
                </ul>
            </div>
            {close && <PaymentDetails setClose={setClose} setOpen={setOpen}/>}
            {open && <Popup setOpen={setOpen}  />}
        </header>
    );
};

export default HeaderUser;
