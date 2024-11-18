"use client"
import React, { useCallback, useEffect, useState } from 'react'
import { BsCashCoin } from "react-icons/bs";
import { FaUsers } from "react-icons/fa6";
import axios from 'axios';
import toast, { Toaster } from 'react-hot-toast';
import { useRouter } from 'next/navigation';
import Header from '../../components/header';
import SendMessages from "../../components/message";
import { MdDelete } from "react-icons/md";
import { MdSystemUpdateAlt } from "react-icons/md";
import { MdModeEdit } from "react-icons/md";
import { RiSave3Fill } from "react-icons/ri";
import { MdCancel } from "react-icons/md";
import { VscDebugStart } from "react-icons/vsc";

interface Transaction {
    customerEmail: string;
    status: string;
    paid_at: string;
    channel: string;
    customerPayment: number;
}

const Page = () => {
    const [frontIdBase64, setFrontIdBase64] = useState("");
    const [userId,setUserId]= useState(0)
    const [backIdBase64, setBackIdBase64] = useState("");
    const [verify, setVerify] = useState<number | null>(null);
    const [investment, setInvestment] = useState<number | null>(null);
    const [totalUsers, setTotalUsers] = useState<number>(0);
    const [userData, setUserData] = useState<Transaction[]>([]);
    const [users, setUsers] = useState<any>([])
    const [message, setMessage] = useState<any>(false);
    const [edit, setEdit] = useState(false)
    const [currentEditIndex, setCurrentEditIndex] = useState<number | null>(null);
    const [deposit, setDeposit] = useState(0)
    const [usersDeleted, setUsersDeleted] = useState(0)
    const [balance, setBalance] = useState<any>(20)
    // const [initialBalance, setInitialBalance] = useState(balance);
    const [elapsedTime, setElapsedTime] = useState<number>(0); // Track elapsed time

    function handleMessage() {
        setMessage((prev: any) => !prev)

    }
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
            // setTotalUsers(extractedData.length)
            setUserData(extractedData)
        } catch (error: any) {
            console.log("Failed to get the list", error.message)
            toast.error("Failed to get the list")
        }
    }
    const totalAmount = userData.reduce((acc, transaction) => {
        return acc + (transaction.status === "success" ? transaction.customerPayment : 0);
    }, 0);
    const router = useRouter()
    const getUser = async () => {
        try {
            const users = await axios.get('/api/users/all')
            const finalUsers = users.data.data;
            const verifiedUsers = finalUsers.filter((user: any) => user.idVerification === true).length
            const totalInvestment = finalUsers.reduce((sum: number, user: any) => {
                const investment = parseFloat(user.investment);
                return sum + (isNaN(investment) ? 0 : investment);
            }, 0);
            const updatedUsers = finalUsers.map((user: any) => ({
                ...user,
                frontIdImage: user.frontIdImage ? `data:image/png;base64,${user.frontIdImage}` : null,
                backIdImage: user.backIdImage ? `data:image/png;base64,${user.backIdImage}` : null,
            }));

            // arrayBufferToBase64(updatedUsers[17].images.frontIdImage.data);
            setInvestment(totalInvestment)
            setVerify(verifiedUsers)
            setTotalUsers(users.data.data.length)
            setUsers(updatedUsers)

        } catch (error: any) {
            if (error.response) {
                const statusCode = error.response.status;
                // Handle specific HTTP error status codes
                switch (statusCode) {
                    case 400:
                        console.error("Bad Request - Invalid data provided.");
                        break;
                    case 401:
                        console.error("Unauthorized - Please log in.");
                        // Optional: Redirect to login page or show login prompt
                        break;
                    case 403:
                        console.error("Forbidden - You do not have permission.");
                        break;
                    case 404:
                        console.error("User data not found.");
                        break;
                    case 500:
                        console.error("Internal Server Error - Try again later.");
                        break;
                    default:
                        console.error(`Unexpected error occurred: ${statusCode}`);
                }
            } else {
                // Handle network errors or unexpected issues
                console.error("Network error or unknown error:", error.message);
            }
        }
    }

    function handleDeposit(user: any, index: number) {
        setEdit((prev) => !prev);
        setCurrentEditIndex(index);
    }

    async function deleteUser(user: any) {
        try {
            setUsersDeleted(prev => prev + 1)
            const deleteUser = await axios.delete('/api/users/delete', {
                data: {
                    userId: user._id,
                },
            })
            if (deleteUser) {
                return toast.success("User deleted successfully!")
            } else {
                return toast.error("User not successfully deleted!")
            }
        } catch (error: any) {
            console.log(error.message)
        }
    }
    useEffect(() => {
        getUser()
        // getTransactions()
    }, [])
    async function saveDeposit(user: any) {
        try {
            const data = await axios.put('/api/users/edit/deposit', {
                userId: user._id,
                deposit: deposit
            })
            if (data) {
                toast.success("Deposit price updated successfully!")
                getUser();
            } else {
                return toast.error("Deposit price not updated!")
            }
        } catch (error: any) {
            console.log(error.message)
        }
    }
    async function handleTrade(user: any) {
        const initialUserBalance = parseFloat(user.investment) || 100;
        const userIds = user._id;
        await balanceChange(initialUserBalance, userIds)
    }
    // const balanceChange = useCallback((initialBalance: number, userIds: any) => {
    //     const updateInterval = 60 * 1000; // 1 minute in milliseconds
    //     const maxTime = 15 * 60 * 1000; // 15 minutes in milliseconds
    //     const startTime = Date.now();
    //     const effectiveInitialBalance = initialBalance || 100; // Fallback to 100 if initialBalance is zero or undefined
    //     const maxBalance = effectiveInitialBalance * 10; // Set max balance to 10 times the initial

    //     const intervalId = setInterval(() => {
    //         setElapsedTime((prevTime) => {
    //             const elapsedTime = Date.now() - startTime;

    //             if (elapsedTime >= maxTime) {
    //                 clearInterval(intervalId);
    //                 return maxTime;
    //             }

    //             // Generate a random multiplier for the balance adjustment
    //             const randomMultiplier = Math.random() * 10;
    //             const direction = Math.random() < 0.7 ? 1 : -1; // Slightly bias towards increasing
    //             const adjustment = direction * randomMultiplier * effectiveInitialBalance;

    //             setBalance(async (currentBalance: any) => {
    //                 const numericBalance = typeof currentBalance === 'number' ? currentBalance : parseFloat(currentBalance) || effectiveInitialBalance;

    //                 // Calculate the new balance with adjustment
    //                 let newBalance = numericBalance + adjustment;
    //                 const formattedBalance = parseFloat(newBalance.toFixed(2));
    //                 await axios.put('/api/users/edit/deposit', {
    //                     userId: userIds,
    //                     deposit: formattedBalance
    //                 });
    //                 // Check if we've reached maxBalance
    //                 if (newBalance >= maxBalance) {
    //                     clearInterval(intervalId); // Stop updating if maxBalance is reached
    //                     (async () => {
    //                         try {
    //                             const formattedBalance = parseFloat(newBalance.toFixed(2));
    //                             await axios.put('/api/users/edit/deposit', {
    //                                 userId: userIds,
    //                                 deposit: formattedBalance
    //                             });
    //                             toast.success("Maximum Price Reached");
    //                         } catch (error) {
    //                             console.error("Error updating balance:", error);
    //                             toast.error("Failed to update balance");
    //                         }
    //                     })();
    //                 }

    //                 return parseFloat(newBalance.toFixed(2));
    //             });

    //             return elapsedTime;
    //         });
    //     }, updateInterval);

    //     return () => clearInterval(intervalId);
    // }, []);
    const balanceChange = useCallback((initialBalance: number, userIds: any) => {
        const updateInterval = 60 * 1000; // 1 minute in milliseconds
        const maxTime = 15 * 60 * 1000; // 15 minutes in milliseconds
        const startTime = Date.now();
        const effectiveInitialBalance = initialBalance || 100; // Fallback to 100 if initialBalance is zero or undefined
        const maxBalance = effectiveInitialBalance * 10; // Set max balance to 10 times the initial

        const intervalId = setInterval(() => {
            setElapsedTime((prevTime) => {
                const elapsedTime = Date.now() - startTime;

                if (elapsedTime >= maxTime) {
                    clearInterval(intervalId);
                    return maxTime;
                }

                // Generate a random multiplier for the balance adjustment
                const randomMultiplier = Math.random() * 10;
                const direction = Math.random() < 0.7 ? 1 : -1; // Slightly bias towards increasing
                const adjustment = direction * randomMultiplier * effectiveInitialBalance;

                setBalance(async (currentBalance: any) => {
                    const numericBalance = typeof currentBalance === 'number' ? currentBalance : parseFloat(currentBalance) || effectiveInitialBalance;

                    // Calculate the new balance with adjustment
                    let newBalance = numericBalance + adjustment;
                    const formattedBalance = parseFloat(newBalance.toFixed(2));

                    try {
                        await axios.put('/api/users/edit/deposit', {
                            userId: userIds,
                            deposit: formattedBalance
                        });
                    } catch (error) {
                        console.error("Error updating balance:", error);
                        toast.error("Failed to update balance");
                    }

                    // Check if we've reached maxBalance
                    if (newBalance >= maxBalance) {
                        clearInterval(intervalId); // Stop updating if maxBalance is reached
                        (async () => {
                            try {
                                await axios.put('/api/users/edit/deposit', {
                                    userId: userIds,
                                    deposit: formattedBalance
                                });
                                toast.success("Maximum Price Reached");
                            } catch (error) {
                                console.error("Error updating balance after reaching max:", error);
                                toast.error("Failed to update balance after reaching max");
                            }
                        })();
                    }

                    return parseFloat(newBalance.toFixed(2));
                });

                return elapsedTime;
            });
        }, updateInterval);

        return () => clearInterval(intervalId);
    }, []);
    function handleUserVerification(data: any) {
        try {
            const base64Front = arrayBufferToBase64(data.images.frontIdImage.data)
            const base64Back = arrayBufferToBase64(data.images.backIdImage.data);
            setUserId(data._id)
            if (!base64Front && !base64Back) {
                return toast.error("No documents uploaded!")
            }
            setFrontIdBase64(base64Front)
            setBackIdBase64(base64Back)
        } catch (error) {
            return toast.error("No documents uploaded!")
        }
    }
    const arrayBufferToBase64 = (buffer: any) => {
        let binary = '';
        const bytes = new Uint8Array(buffer);
        const length = bytes.byteLength;
        for (let i = 0; i < length; i++) {
            binary += String.fromCharCode(bytes[i]);
        }
        return window.btoa(binary);
    };
    function handleApproval(id: number) {
        axios
          .put('/api/users/verification/approval', { userId: id })
          .then((response) => {
            if(response.data.success){
                return toast.success('Approval successful');
            }
            // Handle success logic here (e.g., updating UI)
          })
          .catch((error) => {
            toast.error('Error during approval');
            // Handle error logic here
          });
      }
      
    return (
        <>
            <Header />
            <div className="h-[calc(100vh-120px)] w-full absolute top-14">
                <section id="content" className="w-[100wh-60px] lg:w-[100wh-250px] ml-[] lg:ml-[] p-5 right-0 transition-all duration-500 ease-in-out">
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols">
                        <div className="bg-slate-50 p-5 m-2 rounded-md flex justify-between items-center shadow">
                            <div>
                                <h3 className="font-bold">Total Income</h3>
                                <p className="text-gray-500">£ {!investment ? "Loading" : investment}</p>
                            </div>
                            <BsCashCoin size={30} color='green' />
                        </div>

                        <div className="bg-slate-50 p-5 m-2 flex justify-between items-center shadow">
                            <div>
                                <h3 className="font-bold">Total Users</h3>
                                <p className="text-gray-500">{!totalUsers ? "Loading..." : totalUsers}</p>
                            </div>
                            <FaUsers size={30} color='green' />
                        </div>

                        <div className="bg-slate-50 p-5 m-2 flex justify-between items-center shadow">
                            <div>
                                <h3 className="font-bold">Total Verified Users</h3>
                                <p className="text-gray-500">{!verify ? "Loading..." : verify}</p>
                            </div>
                            <FaUsers size={30} color='orange' />
                        </div>
                    </div>
                    <Toaster />
                    <div className="grid grid-cols-1 gap-2 p-4 lg:grid-cols-2">
                        <div className="overflow-x-auto m-2 shadow-md ">
                            <table className="w-full">
                                <thead className="bg-gray-100">
                                    <tr>
                                        <th className="text-left p-3">Name</th>
                                        <th className="text-left p-3">Email</th>
                                        <th className="text-left p-3">Deposit</th>
                                        <th className="text-left p-3">Verification</th>
                                        <th className="text-center p-3"></th>
                                        <th className="text-center p-3"></th>
                                        <th className="text-center p-3"></th>
                                        <th className="text-center p-3"></th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {users.map((user: any, index: any) => (
                                        <tr key={index} className="border-b border-gray-200 hover:bg-gray-50">
                                            <td className="p-3">{user.fullName === "Provide your full name" ? "No name provided" : user.fullName}</td>
                                            <td className="p-3">{user.email}</td>
                                            <td className="p-3">
                                                <div className='flex justify-center text-center'>
                                                    £ {user.investment === "Provide your investment" ? 0 : user.investment}
                                                    {
                                                        currentEditIndex === index && edit && (
                                                            <input type='number' onChange={(e: any) => setDeposit(e.target.value)} className='w-12 h-10 border rounded-lg ml-2' />
                                                        )
                                                    }
                                                    {
                                                        currentEditIndex === index && edit ? <MdCancel className='ml-1 cursor-pointer hover:text-red-600 text-center justify-center text-red-500' onClick={() => setEdit(false)} /> : <MdModeEdit className='ml-1 cursor-pointer hover:text-green-600 text-center justify-center text-yellow-500'
                                                            onClick={() => handleDeposit(user, index)}
                                                        />
                                                    }



                                                </div>
                                            </td>
                                            <td className="p-3">
                                                <span className={`${user.idVerification ? "bg-green-50" : "bg-red-50"} ${user.idVerification ? "text-green-700" : "text-red-700"}  px-3 py-1 ring-1 ${user.idVerification ? "ring-green-200" : "ring-red-200"}  text-xs rounded-md`}>
                                                    {!user.idVerification ? "Not Verified" : "Verified"}
                                                </span>
                                            </td>
                                            <td className="p-3"> <MdDelete className='text-red-300 hover:text-red-600 cursor-pointer' onClick={() => deleteUser(user)} /></td>
                                            <td className="p-3"> <RiSave3Fill className='text-green-300 hover:text-green-600 cursor-pointer' size={20} onClick={() => saveDeposit(user)} /></td>
                                            <td className="p-3"> <VscDebugStart className='text-red-300 hover:text-red-600 cursor-pointer' size={20} onClick={() => handleTrade(user)} /></td>
                                            <td className="p-3 text-green-200 cursor-pointer hover:text-green-500 font-medium" onClick={() => handleUserVerification(user)}> Verify</td>
                                        </tr>
                                    ))}
                                </tbody>

                            </table>
                        </div>
                        <div >
                            <button className='bg-blue-300 hover:bg-blue-600 text-white py-2 px-2 rounded-lg cursor-pointer mb-2' onClick={handleMessage}>Create Message</button>
                            {message && <SendMessages />}
                        </div>
                        <div className="flex flex-col items-center space-y-6 p-6 bg-gray-50 rounded-lg shadow-md">
                            <div className="flex flex-col items-center">
                                <h2 className="text-lg font-semibold text-gray-700 mb-2">Front ID</h2>
                                {frontIdBase64 ? (
                                    <img
                                        src={`data:image/png;base64,${frontIdBase64}`}
                                        alt="Front ID"
                                        className="w-48 h-48 object-cover rounded-lg border-2 border-gray-300 shadow-md"
                                    />
                                ) : (
                                    <p className="text-sm text-gray-500 italic">Loading Front Image...</p>
                                )}
                            </div>

                            <div className="flex flex-col items-center">
                                <h2 className="text-lg font-semibold text-gray-700 mb-2">Back ID</h2>
                                {backIdBase64 ? (
                                    <img
                                        src={`data:image/png;base64,${backIdBase64}`}
                                        alt="Back ID"
                                        className="w-48 h-48 object-cover rounded-lg border-2 border-gray-300 shadow-md"
                                    />
                                ) : (
                                    <p className="text-sm text-gray-500 italic">Loading Back Image...</p>
                                )}
                            </div>

                            {/* Approve Button */}
                            <button
                                onClick={() => handleApproval(userId)}
                                className="mt-4 px-6 py-3 bg-green-600 text-white font-semibold rounded-lg shadow-md hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2"
                            >
                                Approve Verification
                            </button>
                        </div>


                    </div>
                </section>
            </div>

        </>
    )
}

export default Page