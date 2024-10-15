import React from 'react'
import Header from '../components/header'
import { BsCashCoin } from "react-icons/bs";
import { FaUsers } from "react-icons/fa6";


const page = () => {
    return (
        <div>
            <Header />
            <div className="h-[calc(100vh-120px)] w-full absolute top-14">
                <section id="content" className="w-[100wh-60px] lg:w-[100wh-250px] ml-[] lg:ml-[] p-5 right-0 transition-all duration-500 ease-in-out">
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols">
                    <div className="bg-slate-50 p-5 m-2 rounded-md flex justify-between items-center shadow">
                            <div>
                                <h3 className="font-bold">Total Income</h3>
                                <p className="text-gray-500">$400</p>
                            </div>
                            <BsCashCoin size={30} color='green' />
                        </div>
                        <div className="bg-slate-50 p-5 m-2 rounded-md flex justify-between items-center shadow">
                            <div>
                                <h3 className="font-bold">Total Users</h3>
                                <p className="text-gray-500">100</p>
                            </div>
                            <FaUsers size={30} color='gray'/>
                        </div>

                        <div className="bg-slate-50 p-5 m-2 flex justify-between items-center shadow">
                            <div>
                                <h3 className="font-bold">Total Active Users</h3>
                                <p className="text-gray-500">65</p>
                            </div>
                            <FaUsers size={30} color='green'/>
                        </div>

                        <div className="bg-slate-50 p-5 m-2 flex justify-between items-center shadow">
                            <div>
                                <h3 className="font-bold">Total Inactive Users</h3>
                                <p className="text-gray-500">30</p>
                            </div>
                            <FaUsers size={30} color='orange'/>
                        </div>

                        <div className="bg-slate-50 p-5 m-2 flex justify-between items-center shadow">
                            <div>
                                <h3 className="font-bold">Deleted Users</h3>
                                <p className="text-gray-500">5</p>
                            </div>
                            <FaUsers size={30} color='red'/>
                        </div>
                        
                    </div>

                    <div className="grid grid-cols-1 gap-2 p-4 lg:grid-cols-2">
                        <div className="overflow-x-auto m-2 shadow-md">
                            <table className="w-full">
                                <thead className="bg-gray-100">
                                    <tr>
                                        <th className="text-left p-3">Avatar</th>
                                        <th className="text-left p-3">User Name</th>
                                        <th className="text-left p-3">Email</th>
                                        <th className="text-left p-3">Phone</th>
                                        <th className="text-left p-3">Status</th>
                                        <th className="text-center p-3"></th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr className="border-b border-gray-200 hover:bg-gray-50">
                                        <td className="p-3">
                                            <img className="inline-block h-8 w-8 rounded-full ring-2 ring-white" src="https://images.unsplash.com/photo-1500648767791-00dcc994a43e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2.25&w=256&h=256&q=80" alt="" />
                                        </td>
                                        <td className="p-3">Rabiul Islam</td>
                                        <td className="p-3">rir.cse.71@gmail.com</td>
                                        <td className="p-3">+8801750009149</td>
                                        <td className="p-3">
                                            <span className="bg-green-50 text-green-700 px-3 py-1 ring-1 ring-green-200 text-xs rounded-md">Active</span>
                                        </td>
                                        <td className="p-3 text-center">
                                            <div className="flex justify-center gap-2">
                                                <i title="Delete" className="fa-solid fa-trash p-1 text-red-500 rounded-full cursor-pointer">Delete</i>
                                            </div>
                                        </td>
                                    </tr>

                                    <tr className="border-b border-gray-200 hover:bg-gray-50">
                                        <td className="p-3">
                                            <img className="inline-block h-8 w-8 rounded-full ring-2 ring-white" src="https://images.unsplash.com/photo-1550525811-e5869dd03032?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80" alt="" />
                                        </td>
                                        <td className="p-3">John Doe</td>
                                        <td className="p-3">johndoe@example.com</td>
                                        <td className="p-3">+8801579999149</td>
                                        <td className="p-3">
                                            <span className="bg-yellow-50 text-yellow-700 px-3 py-1 ring-1 ring-yellow-200 text-xs rounded-md">Pending</span>
                                        </td>
                                        <td className="p-3 text-center">
                                            <div className="flex justify-center gap-2">
                                                <i title="Delete" className="fa-solid fa-trash p-1 text-red-500 rounded-full cursor-pointer">Delete</i>
                                            </div>
                                        </td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                    </div>

                </section>
            </div>

        </div>
    )
}

export default page