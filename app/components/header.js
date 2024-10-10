"use client"
import React, { useState } from 'react';

const Header = () => {
    const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);

    const toggleSidebar = () => {
        setIsSidebarCollapsed(prev => !prev);
    };

    const toggleUserDropdown = () => {
        setIsDropdownOpen(prev => !prev);
    };

    return (
        <header className="h-14 bg-gray-100 top-0 w-full fixed shadow" style={{ zIndex: 99999 }}>
            <div className="flex justify-between items-center px-10 h-14">
                <div className="flex justify-between items-center gap-x-14">
                    <div className="w-40">
                        <h2 className="text-md font-bold">Rabiul Islam</h2>
                        <p className="text-gray-400 text-[12px]">Web Developer</p>
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
                        <img
                            className="inline-block h-8 w-8 rounded-full ring-2 ring-white cursor-pointer"
                            src="https://images.unsplash.com/photo-1550525811-e5869dd03032?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
                            alt=""
                        />
                        <ul className={`absolute ${isDropdownOpen ? 'block' : 'hidden'} bg-white right-4 top-14 w-28 rounded shadow-md`}>
                           
                            <li className="mb-1 hover:bg-gray-50 text-gray-700 hover:text-gray-900">
                                <a className="block px-5 py-2" href="#">Logout</a>
                            </li>
                        </ul>
                    </li>
                </ul>
            </div>
        </header>
    );
};

export default Header;
