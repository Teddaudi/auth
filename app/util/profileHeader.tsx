"use client"
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Link from 'next/link';
import toast from 'react-hot-toast';
import { useRouter } from 'next/navigation';

interface HeaderUserProps {
    username: string; // Define the type for the username prop
}
const HeaderUser: React.FC<HeaderUserProps> = ({username}) => {
    const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);
    const router = useRouter()
    const logOut = async()=>{
        try {
          await axios.get('/api/users/logout')
          toast.success('Logout successful')
          router.push('/signin')
        } catch (error:any) {
            toast.error(error.message)
        }
    }
    // Function to handle clicks outside of the dropdown to close it
    useEffect(() => {
        const handleOutsideClick = (e:any) => {
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
                        <img
                            className="inline-block h-8 w-8 rounded-full ring-2 ring-white cursor-pointer"
                            src="https://bootdey.com/img/Content/avatar/avatar7.png"
                            alt="User avatar"
                        />
                        <ul
                            className={`absolute ${isDropdownOpen ? 'block' : 'hidden'} bg-white right-0 top-12 w-28 rounded shadow-md z-20`}
                        >
                            <li className="mb-1 hover:bg-gray-50 text-gray-700 hover:text-gray-900">
                                <a className="block px-5 py-2" href="#" onClick={logOut}>Logout</a>
                            </li>
                        </ul>
                    </li>
                </ul>
            </div>
        </header>
    );
};

export default HeaderUser;
