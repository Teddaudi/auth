"use client"
import React, { useEffect, useState } from 'react'
import './profile.css'
import { MdOutlineVerifiedUser } from "react-icons/md";
import EditUser from '../util/editUser';
import HeaderUser from '../util/profileHeader';
import axios from 'axios';
import toast from 'react-hot-toast';
import { useRouter } from 'next/navigation';
import PaystackPop from '@paystack/inline-js'; 

const page = () => {
    const [edit, setEdit] = useState(false)
    const [data, setData] = useState("")
    const [username, setUsername] = useState("")
    const [email, setEmail] = useState("")
    const [user, setUser] = useState({
        fullName: "",
        phone: "",
        address: "",
        investment: ""
    })
    const [amount,setAmount]=useState("")
    const router = useRouter()

    function handleEdit() {
        setEdit(prev => !prev)
    }
    const fetchData = async () => {
        try {
            const res = await axios.get('/api/users/me');
            const userData = res.data.data;

        setUser({
            fullName: userData.fullName || '',
            phone: userData.phone || '',
            address: userData.address || '',
            investment: userData.investment || ''
        });
        setEmail(userData.email);
        setUsername(userData.username);
        } catch (error: any) {
            toast.error("Error fetching user data:", error);
        }
    };
    const editUserData = async () => {
        try {
            await axios.put('/api/users/me', user);
            handleEdit();
        } catch (error: any) {
            toast.error("Failed to update", error.message)
        }
    }
    const initializePay = async () => {
        if (typeof window !== 'undefined') {
            const PaystackPop = (await import('@paystack/inline-js')).default;
            try {
                const popup = new PaystackPop();
                const pay = await axios.post('/api/payment', { email, amount });
                const access_code = pay.data.data.access_code;
                popup.resumeTransaction(access_code);
                toast.success("Payment initialised successfully");
            } catch (error: any) {
                toast.error("Payment failed", error.message);
            }
        } else {
            console.error("Paystack can only be initialized in the browser.");
        }
    };
    const getTransactions =async()=>{
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
        
        console.log("Transactions:",extractedData[0].customerEmail);
       } catch (error:any) {
        console.log("Failed to get the list", error.message)
        toast.error("Failed to get the list", error.message)
       }
    }
    // getTransactions()

    useEffect(() => {
        fetchData()
    }, [data])

    return (
        <>
            <HeaderUser username={username}/>
            <div className="container mx-auto p-4 ">
                <div className="flex flex-wrap -mx-4 mt-10">
                    {/* Sidebar */}
                    <div className="w-full md:w-1/3 px-4 mb-4">
                        <div className="bg-white shadow rounded-lg p-4 mb-6">
                            <div className="flex flex-col items-center text-center">
                                <img
                                    src="https://bootdey.com/img/Content/avatar/avatar7.png"
                                    alt="Admin"
                                    className="rounded-full w-32 h-32 object-cover"
                                />
                                <div className="mt-3">
                                    <h4 className="text-lg font-semibold">{!username ?"Loading...":username}</h4>
                                    <p className="text-gray-500">{user.address}</p>
                                    <div className="bg-green-300 rounded-lg cursor-pointer hover:bg-green-600 text-white text-sm font-semibold p-2">Account Balance: £ 200</div>
                                </div>
                            </div>
                        </div>

                        <div className="bg-white shadow rounded-lg">
                            <ul className="list-none">
                                <li className="flex justify-between items-center p-4 border-b">
                                    <h6 className="flex items-center">
                                        <MdOutlineVerifiedUser size={20} color='gray' className="mr-2" />
                                        Verification Status
                                    </h6>
                                    <div className="text-white bg-red-500 px-1 text-xs">Not verified</div>
                                </li>
                            </ul>
                        </div>
                    </div>

                    {/* Main Content */}
                    <div className="w-full md:w-2/3 px-4">
                        <div className="bg-white shadow rounded-lg mb-6">
                            <div className="p-4">
                                <div className="grid grid-cols-3 gap-4">
                                    <div className="col-span-1">
                                        <h6>Full Name</h6>
                                    </div>
                                    <div className="col-span-2 text-gray-600">{!user.fullName ? 'Provide your full name' : user.fullName}</div>
                                </div>
                                <hr className="my-2" />
                                <div className="grid grid-cols-3 gap-4">
                                    <div className="col-span-1">
                                        <h6>Email</h6>
                                    </div>
                                    <div className="col-span-2 text-gray-600">{!email ? "Loading...":email}</div>
                                </div>
                                <hr className="my-2" />
                                <div className="grid grid-cols-3 gap-4">
                                    <div className="col-span-1">
                                        <h6>Phone</h6>
                                    </div>
                                    <div className="col-span-2 text-gray-600">{!user.phone ? 'Provide your phone number' : user.phone}</div>
                                </div>
                                <hr className="my-2" />
                                <div className="grid grid-cols-3 gap-4">
                                    <div className="col-span-1">
                                        <h6>Address</h6>
                                    </div>
                                    <div className="col-span-2 text-gray-600">{!user.address ? 'Provide your address' : user.address}</div>
                                </div>
                                <hr className="my-2" />
                                <div className="text-right">
                                    <button className="bg-blue-600 text-white px-4 py-2 rounded" onClick={handleEdit}>Edit</button>
                                </div>
                            </div>
                        </div>
                        {edit && <EditUser handleEdit={handleEdit} user={user} setUser={setUser} editUserData={editUserData} />}

                        <div className="flex flex-wrap -mx-4">
                            <div className="w-full md:w-1/2 px-4 mb-4">
                                <div className="bg-white shadow rounded-lg h-full">
                                    <div className="p-4">
                                        <h1 className="flex items-center mb-3 font-bold">
                                            Investment   Rankings
                                        </h1>
                                        <small>Bronze</small>
                                        <div className="relative pt-1">
                                            <div className="flex mb-2 items-center justify-between">
                                                <div>
                                                    <span className="text-xs w-[200px] justify-center text-center h-[30px] content-center cursor-pointer font-semibold inline-block py-1 px-2 uppercase rounded-full text-white bronze">
                                                        £ 100
                                                    </span>

                                                </div>
                                            </div>
                                            <hr />
                                        </div>
                                        <small>Silver</small>
                                        <div className="relative pt-1">
                                            <div className="flex mb-2 items-center justify-between">
                                                <div>
                                                    <span className="text-xs w-[200px] justify-center text-center h-[30px] content-center cursor-pointer font-semibold inline-block py-1 px-2 uppercase rounded-full text-white silver">
                                                        £ 400
                                                    </span>
                                                </div>
                                            </div>
                                            <hr />
                                        </div>
                                        <small>Gold</small>
                                        <div className="relative pt-1">
                                            <div className="flex mb-2 items-center justify-between">
                                                <div>
                                                    <span className="text-xs w-[200px] justify-center text-center h-[30px] content-center cursor-pointer font-semibold inline-block py-1 px-2 uppercase rounded-full text-white gold">
                                                        £ 1000
                                                    </span>
                                                </div>
                                            </div>
                                            <hr />
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div className="w-full md:w-1/2 px-4 mb-4">
                                <div className="bg-white shadow rounded-lg h-full">
                                    <div className="p-4">
                                        <h1 className="flex items-center mb-3 font-bold">
                                            Deposit
                                        </h1>
                                        <p>Choose the cryptocurrency to invest</p>
                                        <div className="w-full max-w-sm mx-auto  p-4 ">
                                            <ul className="list-none">
                                                <li className="flex items-center py-2">
                                                    <label className="flex items-center cursor-pointer w-full">
                                                        <input type="radio" name="task" className="mr-2 text-blue-600" />
                                                        <span className="text-gray-600">BTC</span>
                                                    </label>
                                                </li>
                                                <li className="flex items-center py-2">
                                                    <label className="flex items-center cursor-pointer w-full">
                                                        <input type="radio" name="task" className="mr-2 text-blue-600" />
                                                        <span className="text-gray-600">ETH</span>
                                                    </label>
                                                </li>
                                                <li className="flex items-center py-2">
                                                    <label className="flex items-center cursor-pointer w-full">
                                                        <input type="radio" name="task" className="mr-2 text-blue-600" />
                                                        <span className="text-gray-600">GOLD</span>
                                                    </label>
                                                </li>
                                            </ul>
                                            <div className="mt-4 flex">
                                                <div className="justify-center content-center text-center text-lg font-bold">
                                                    £
                                                </div>
                                                <input
                                                    type="number"
                                                    name="amount"
                                                    value={amount}
                                                    onChange={(e) => setAmount(e.target.value )}
                                                    placeholder="Enter amount"
                                                    className="w-full px-3 ml-3 py-2 border rounded text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-400"
                                                />
                                            </div>

                                            <div className="mt-6">
                                                <button
                                                    type="submit"
                                                    className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 transition duration-300"
                                                    onClick={initializePay}
                                                >
                                                    Pay
                                                </button>
                                            </div>
                                        </div>


                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default page