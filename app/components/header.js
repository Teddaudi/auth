"use client"
import axios from 'axios';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import React, { useEffect, useState } from 'react';
import toast from 'react-hot-toast';
import avatarImg from "../../images/avatar.png" 

const Header = () => {
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);
    const [username, setUsername] = useState("")
    const router = useRouter()

    const toggleUserDropdown = () => {
        setIsDropdownOpen(prev => !prev);
    };
    const fetchData = async () => {
        try {
            const res = await axios.get('/api/users/me');
            const userData = res.data.data;
            setUsername(userData.username);
        } catch (error) {
            toast.error("Error fetching user data:", error);
        }
    };
    const logOut = async () => {
        try {
            await axios.get('/api/users/logout')
            toast.success('Logout successful')
            router.push('/signin')
        } catch (error) {
            toast.error(error.message)
        }
    }
    useEffect(() => {
        fetchData()
    }, [])
    return (
        <header className="h-14 bg-gray-100 top-0 w-full fixed shadow mb-[36px]" style={{ zIndex: 10 }}>
            <div className="flex justify-between items-center px-10 h-14">
                <div className="flex justify-between items-center gap-x-14">
                    <div className="w-40">
                        <h2 className=" text-gray-400 text-[18px] ">Welcome</h2>
                        <p className="text-md font-bold">{!username ? "Loading..." : username}</p>
                    </div>
                    {/* <button
                        id="toggle-button"
                        className={`hidden lg:block bg-gray-200 rounded-full transition-all duration-500 ease-in-out ${isSidebarCollapsed ? 'rotate-180' : 'rotate-0'}`}
                        onClick={toggleSidebar}
                    >
                        <i className="fa-solid fa-arrow-left p-3">TT</i>
                    </button> */}
                </div>

                <ul className="flex items-center gap-5">
                    {/* <li>
                        <a className="bg-gray-200 px-3 py-2 rounded-sm" href="#">
                            <i className="fa-regular fa-bell"></i>
                        </a>
                    </li> */}
                    <li onClick={toggleUserDropdown}>
                        <Image
                            className="inline-block h-8 w-8 rounded-full ring-2 ring-white cursor-pointer"
                            src={avatarImg}
                            alt="Profile Image"
                            width={32} // Adjust width to match the size of the image (e.g., 8 * 4 = 32)
                            height={32} // Adjust height to match the size of the image (e.g., 8 * 4 = 32)
                        />
                        <ul className={`absolute ${isDropdownOpen ? 'block' : 'hidden'} bg-white right-4 top-14 w-28 rounded shadow-md`}>

                            <li className="mb-1 hover:bg-gray-50 text-gray-700 hover:text-gray-900">
                                <a className="block px-5 py-2" onClick={logOut}>Logout</a>
                            </li>
                        </ul>
                    </li>
                </ul>
            </div>
        </header>
    );
};

export default Header;
