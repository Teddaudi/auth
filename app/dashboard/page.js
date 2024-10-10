import React from 'react'
import Header from '../components/header'

const page = () => {
    return (
        <div>
            <Header/>
            <div className="h-[calc(100vh-120px)] w-full absolute top-14">
                <section id="content" className="w-[100wh-60px] lg:w-[100wh-250px] ml-[] lg:ml-[] p-5 right-0 transition-all duration-500 ease-in-out">
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols">
                        <div className="bg-slate-50 p-5 m-2 rounded-md flex justify-between items-center shadow">
                            <div>
                                <h3 className="font-bold">Total Users</h3>
                                <p className="text-gray-500">100</p>
                            </div>
                            <i className="fa-solid fa-users p-4 bg-gray-200 rounded-md"></i>
                        </div>

                        <div className="bg-slate-50 p-5 m-2 flex justify-between items-center shadow">
                            <div>
                                <h3 className="font-bold">Total Active Users</h3>
                                <p className="text-gray-500">65</p>
                            </div>
                            <i className="fa-solid fa-users p-4 bg-green-200 rounded-md"></i>
                        </div>

                        <div className="bg-slate-50 p-5 m-2 flex justify-between items-center shadow">
                            <div>
                                <h3 className="font-bold">Total Inactive Users</h3>
                                <p className="text-gray-500">30</p>
                            </div>
                            <i className="fa-solid fa-users p-4 bg-yellow-200 rounded-md"></i>
                        </div>

                        <div className="bg-slate-50 p-5 m-2 flex justify-between items-center shadow">
                            <div>
                                <h3 className="font-bold">Deleted Users</h3>
                                <p className="text-gray-500">5</p>
                            </div>
                            <i className="fa-solid fa-users p-4 bg-red-200 rounded-md"></i>
                        </div>
                    </div>

                    <div className="grid grid-cols-1 gap-2 lg:grid-cols-2">
                        <div className="overflow-x-auto m-2 shadow-md">
                            <table className="w-full">
                                <thead className="bg-gray-100 rounded-sm">
                                    <tr>
                                        <th className="text-left">Avatar</th>
                                        <th className="text-left">User Name</th>
                                        <th className="text-left">Email</th>
                                        <th className="text-left">Phone</th>
                                        <th className="text-left">Status</th>
                                        <th className="text-center"></th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr>
                                        <td>
                                            <img className="inline-block h-8 w-8 rounded-full ring-2 ring-white" src="https://images.unsplash.com/photo-1500648767791-00dcc994a43e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2.25&w=256&h=256&q=80" alt="" />
                                        </td>
                                        <td>Rabiul Islam</td>
                                        <td>rir.cse.71@gmail.com</td>
                                        <td>+8801750009149</td>
                                        <td>
                                            <span className="bg-green-50 text-green-700 px-3 py-1 ring-1 ring-green-200 text-xs rounded-md">Active</span>
                                        </td>
                                        <td>
                                            <div className="flex justify-between gap-1">
                                                <i title="Edit" className="fa-solid fa-pencil p-1 text-green-500 rounded-full cursor-pointer"></i>
                                                <i title="View" className="fa-solid fa-eye p-1 text-violet-500 rounded-full cursor-pointer"></i>
                                                <i title="Delete" className="fa-solid fa-trash p-1 text-red-500 rounded-full cursor-pointer"></i>
                                            </div>
                                        </td>
                                    </tr>

                                    <tr>
                                        <td>
                                            <img className="inline-block h-8 w-8 rounded-full ring-2 ring-white" src="https://images.unsplash.com/photo-1550525811-e5869dd03032?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80" alt="" />
                                        </td>
                                        <td>John Doe</td>
                                        <td>johndoe@example.com</td>
                                        <td>+8801579999149</td>
                                        <td>
                                            <span className="bg-yellow-50 text-yellow-700 px-3 py-1 ring-1 ring-yellow-200 text-xs rounded-md">Pending</span>
                                        </td>
                                        <td>
                                            <div className="flex justify-between gap-1">
                                                <i title="Edit" className="fa-solid fa-pencil p-1 text-green-500 rounded-full cursor-pointer"></i>
                                                <i title="View" className="fa-solid fa-eye p-1 text-violet-500 rounded-full cursor-pointer"></i>
                                                <i title="Delete" className="fa-solid fa-trash p-1 text-red-500 rounded-full cursor-pointer"></i>
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