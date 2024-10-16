"use client"
import React, { useEffect, useState } from 'react'
import { BsCashCoin } from "react-icons/bs";
import { FaUsers } from "react-icons/fa6";
import axios from 'axios';
import toast from 'react-hot-toast';
import { useRouter } from 'next/navigation';
import Header from '../components/header';

interface Transaction {
    customerEmail: string;
    status: string;
    paid_at: string;
    channel: string;
    customerPayment: number;
}
const page = () => {
    const [totalUsers, setTotalUsers] = useState<number>(0);
    const [userData, setUserData] = useState<Transaction[]>([]);

    const getTransactions = async () => {
        try {
            const data = await axios.get('/api/payment')
            const transactions = data.data.data.data
            const extractedData = transactions.map((transaction: { customer: { email: any; }; status: any; paid_at: any; channel: any; amount: any; }) => ({
                customerEmail: transaction.customer.email,
                status: transaction.status,
                paid_at: transaction.paid_at,
                channel: transaction.channel,
                customerPayment: transaction.amount
            }));
            setTotalUsers(extractedData.length)
            setUserData(extractedData)
        } catch (error: any) {
            console.log("Failed to get the list", error.message)
            toast.error("Failed to get the list", error.message)
        }
    }
    const totalAmount = userData.reduce((acc, transaction) => {
        return acc + (transaction.status === "success" ? transaction.customerPayment : 0);
    }, 0);
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
    // console.log("Total:", totalAmount)
    useEffect(() => {
        getTransactions()
    }, [totalUsers])
    // console.log("data:", userData)
    return (
        <div>
            <Header  />
            <div className="h-[calc(100vh-120px)] w-full absolute top-14">
                <section id="content" className="w-[100wh-60px] lg:w-[100wh-250px] ml-[] lg:ml-[] p-5 right-0 transition-all duration-500 ease-in-out">
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols">
                        <div className="bg-slate-50 p-5 m-2 rounded-md flex justify-between items-center shadow">
                            <div>
                                <h3 className="font-bold">Total Income</h3>
                                <p className="text-gray-500">$ {!totalAmount ? "Loading" : totalAmount}</p>
                            </div>
                            <BsCashCoin size={30} color='green' />
                        </div>
                        {/* <div className="bg-slate-50 p-5 m-2 rounded-md flex justify-between items-center shadow">
                            <div>
                                <h3 className="font-bold">Total Users</h3>
                                <p className="text-gray-500">{!totalUsers ? "Loading..." : totalUsers}</p>
                            </div>
                            <FaUsers size={30} color='gray' />
                        </div> */}

                        <div className="bg-slate-50 p-5 m-2 flex justify-between items-center shadow">
                            <div>
                                <h3 className="font-bold">Total Users</h3>
                                <p className="text-gray-500">{!totalUsers ? "Loading..." : totalUsers}</p>
                            </div>
                            <FaUsers size={30} color='green' />
                        </div>

                        <div className="bg-slate-50 p-5 m-2 flex justify-between items-center shadow">
                            <div>
                                <h3 className="font-bold">Total Inactive Users</h3>
                                <p className="text-gray-500">30</p>
                            </div>
                            <FaUsers size={30} color='orange' />
                        </div>

                        <div className="bg-slate-50 p-5 m-2 flex justify-between items-center shadow">
                            <div>
                                <h3 className="font-bold">Deleted Users</h3>
                                <p className="text-gray-500">5</p>
                            </div>
                            <FaUsers size={30} color='red' />
                        </div>

                    </div>

                    <div className="grid grid-cols-1 gap-2 p-4 lg:grid-cols-2">
                        <div className="overflow-x-auto m-2 shadow-md">
                            <table className="w-full">
                                <thead className="bg-gray-100">
                                    <tr>
                                        <th className="text-left p-3">Channel</th>
                                        <th className="text-left p-3">User Email</th>
                                        <th className="text-left p-3">Email</th>
                                        <th className="text-left p-3">Status</th>
                                        <th className="text-center p-3"></th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {userData.map((user, index) => (
                                        <tr key={index} className="border-b border-gray-200 hover:bg-gray-50">
                                            {/* <td className="p-3">
                                                <img className="inline-block h-8 w-8 rounded-full ring-2 ring-white" src="https://images.unsplash.com/photo-1500648767791-00dcc994a43e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2.25&w=256&h=256&q=80" alt="" />
                                            </td> */}
                                            <td className="p-3">{!user.channel ? "Loading..." : user.channel}</td>
                                            <td className="p-3">{!user.customerEmail ? "Loading..." : user.customerEmail}</td>
                                            <td className="p-3">{!user.customerPayment ? "Loading..." : user.customerPayment}</td>
                                            <td className="p-3">
                                                <span className="bg-green-50 text-green-700 px-3 py-1 ring-1 ring-green-200 text-xs rounded-md">
                                                    {!user.status ? "Loading" : user.status}
                                                </span>
                                            </td>
                                            {/* <td className="p-3 text-center">
                                                <div className="flex justify-center gap-2">
                                                    <i title="Delete" className="fa-solid fa-trash p-1 text-red-500 rounded-full cursor-pointer">Delete</i>
                                                </div>
                                            </td> */}
                                        </tr>
                                    ))}
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