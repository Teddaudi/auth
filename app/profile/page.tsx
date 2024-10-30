"use client"
import React, { useCallback, useEffect, useState } from 'react'
import './profile.css'
import { MdOutlineVerifiedUser } from "react-icons/md";
import { FaRegPenToSquare } from "react-icons/fa6";
import EditUser from '../util/editUser';
import HeaderUser from '../util/profileHeader';
import axios from 'axios';
// import {toast} from 'react-hot-toast';
// import { toast } from 'react-toastify';
import toast, { Toaster } from 'react-hot-toast';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import UploadId from '../util/uploadId'
import { IoCopyOutline } from "react-icons/io5";
import Modal from "../../lib/Modal"
import avatarImg from "../../images/avatar.png"


const Page = () => {
    const [edit, setEdit] = useState(false)
    const [id1, setId1] = useState("")
    const [id2, setId2] = useState("")
    const [verificationStatus, setVerificationStatus] = useState(false)
    const [verify, setVerify] = useState("Not verified")
    const [data, setData] = useState("")
    const [username, setUsername] = useState("")
    const [image, setImage] = useState("")
    const [email, setEmail] = useState("")
    const [user, setUser] = useState({
        fullName: "",
        phone: "",
        address: "",
        investment: ""
    })
    const [amount, setAmount] = useState("")
    const [currency, setCurrency] = useState("£")
    const [balance, setBalance] = useState<any>(0)
    const [initialBalance, setInitialBalance] = useState(balance);
    const router = useRouter()
    const [documentImage, setDocumentImage] = useState(null);
    const [faceImage, setFaceImage] = useState(null);
    const [loading, setLoading] = useState(false);
    const [response, setResponse] = useState(null);
    const [editId, setEditId] = useState(false)
    const [wallet, setWallet] = useState("")
    const [profileImage, setProfileImage] = useState("")
    const [modal, setModal] = useState(false)
    const [elapsedTime, setElapsedTime] = useState<number>(0); // Track elapsed time

    // Handle file selection
    // const handleFileChange = (e, setImage) => {
    //     const file = e.target.files[0];
    //     if (file) {
    //         setImage(file);
    //         setEdit(prev => !prev)
    //     }
    // };
    async function Test() {
        await axios.post('/api/mail', { email: 'daudited@gmail.com', name: 'Daudi' })
        // console.log("clicked")
    }
    // const updateInterval = 1000 * 60 * 60; // 1 hour
    // const maxTime = 24 * 60 * 60 * 1000; // 24 hours in milliseconds
    // const startTime = Date.now();
    // const balanceChange = useCallback(() => {
    //     const updateInterval = 60 * 1000; // 1 minute in milliseconds
    //     const maxTime = 15 * 60 * 1000; // 15 minutes in milliseconds
    //     const startTime = Date.now();

    //     const intervalId = setInterval(() => {
    //         setElapsedTime((prevTime) => {
    //             const elapsedTime = Date.now() - startTime;

    //             // If we've reached or exceeded 24 hours, stop updating
    //             if (elapsedTime >= maxTime) {
    //                 clearInterval(intervalId);
    //                 return maxTime;
    //             }

    //             // Generate a random multiplier between 1 and 10
    //             const randomMultiplier = Math.random() * 9 + 1;

    //             // Use a functional state update to access the current balance
    //             setBalance((currentBalance: any) => {
    //                 // Ensure currentBalance is a number
    //                 const numericBalance = typeof currentBalance === 'number' ? currentBalance : parseFloat(currentBalance) || 0;
    
    //                 let newBalance = numericBalance * randomMultiplier;
    //                 newBalance = Math.max(0, Math.min(newBalance, balance*10))
    //                 console.log(`Previous Balance: £${numericBalance.toFixed(2)}, New Balance: £${newBalance.toFixed(2)}`); // Log balance change
    //                 return parseFloat(newBalance.toFixed(2)); // Round to 2 decimal places
    //             });
    //             toast.success("Profit!")
    //             return elapsedTime;
    //         });
    //     }, updateInterval);

    //     // Clean up the interval when the component unmounts
    //     return () => clearInterval(intervalId);
    // }, []);


    function handleEdit() {
        setEdit(false)
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
            // setAmount(userData)
            setBalance(res.data.data.investment)
        } catch (error: any) {
            console.log("Error fetching user data:", error);
        }
    };
    const editUserData = async () => {
        try {
            await axios.put('/api/users/me', user);
            setEdit(false)
        } catch (error: any) {
            console.log("Failed to update", error.message)
        }
    }
    // const initializePay = async () => {
    //     if (typeof window !== 'undefined') {
    //         const PaystackPop = (await import('@paystack/inline-js')).default;
    //         try {
    //             const popup = new PaystackPop();
    //             const pay = await axios.post('/api/payment', { email, amount });
    //             const access_code = pay.data.data.access_code;
    //             popup.resumeTransaction(access_code);
    //             toast.success("Payment initialised successfully");
    //         } catch (error: any) {
    //             toast.error("Payment failed", error.message);
    //         }
    //     } else {
    //         console.error("Paystack can only be initialized in the browser.");
    //     }
    // };
    // const getTransactions = async () => {
    //     try {
    //         const data = await axios.get('/api/payment')
    //         const transactions = data.data.data.data
    //         const extractedData = transactions.map((transaction: { customer: { email: any; }; status: any; paid_at: any; channel: any; amount: any; }) => ({
    //             customerEmail: transaction.customer.email,
    //             status: transaction.status,
    //             paid_at: transaction.paid_at,
    //             channel: transaction.channel,
    //             customerPayment: transaction.amount
    //         }));

    //         // console.log("Transactions:", extractedData[0].customerEmail);
    //     } catch (error: any) {
    //         // console.log("Failed to get the list", error.message)
    //         toast.error("Failed to get the list", error.message)
    //     }
    // }

    const balFun = async () => {
        try {
            const res = await axios.get('/api/users/me');
            setBalance(res.data.data.investment)
        } catch (error: any) {
            console.log(error.message)
        }
    }
    function statusFun() {
        // console.log("Clicked")
        setVerificationStatus(true)

    }
    // async function test() {
    //     console.log("test")
    //     try {
    //         const binance = await axios.post('/api/binance')
    //         console.log("binance:", binance)
    //     } catch (error: any) {
    //         console.log(error.message)
    //     }
    // }

    const handleCopy = async () => {
        try {
            await navigator.clipboard.writeText(wallet);
            toast.success('Text copied to clipboard!')
        } catch (error) {
            console.log('Failed to copy text:', error);
        }
    };
    async function handleWallet() {
        try {
            if (verify === "Not verified") {
                toast.error("Please verify your account!")
                return;
            }
            setWallet("bc1qsh0dggjz2vyppgqy2akl3w4y6duzmrayu6ptqc")
        } catch (error: any) {
            return console.log(error.message)
        }
    }
    async function handleWalletEth() {
        try {
            if (verify === "Not verified") {
                toast.error("Please verify your account!")
                return;
            }
            setWallet("0x84E374B803491D9fC6a71889E25a16f37B6747Ed")
        } catch (error: any) {
            return console.log(error.message)
        }
    }
    async function handleWalletLtc() {
        try {
            if (verify === "Not verified") {
                toast.error("Please verify your account!")
                return;
            }
            setWallet("ltc1qa2c6wc39utg246rmt38x62src8dct3tvykg3me")
        } catch (error: any) {
            return console.log(error.message)
        }
    }
    async function handleWalletUSDT() {
        try {
            if (verify === "Not verified") {
                toast.error("Please verify your account!")
                return;
            }
            setWallet("TNeyjudVdkxjukNYABqATzne58aTmXnu9U")
        } catch (error: any) {
            return console.log(error.message)
        }
    }
    const editImage = async () => {
        try {
            // console.log("clicked")
            setModal(prev => !prev)
            // toast.success("Good!")
        } catch (error: any) {
            console.log("error:", error.message)
        }
    }
    const handleImageChange = async (e: { preventDefault: () => void; }) => {
        try {
            e.preventDefault()

            const data = new FormData()
            data.set('file', profileImage)
            const res = await fetch('/api/users/edit/image', {
                method: 'PUT',
                body: data
            });
            if (!res.ok) throw new Error(await res.text())
            setModal(false);
            toast.success("Upload successful!");
        } catch (error) {
            toast.error("Profile image upload unsuccessful");
        }
    };
    const avatarFun = async () => {
        try {
            const response = await axios.get('/api/users/edit/image');
            if (response.data.success) {
                setImage(response.data.image); // Set the Base64 image string
            } else {
                console.log(response.data.message);
            }
        } catch (error: any) {
            console.log(error.message);
        }
    };
    const handleClose = async () => {
        setVerificationStatus(false)
    }
    const userStatus = async () => {
        try {
            const verification = await axios.get('/api/users/verification/status')
            // console.log("verification:",verification)
            if (verification.data.data) {
                setVerify("Verified")
            } else {
                setVerify("Not verified")
            }
        } catch (error) {
            return toast.error("You are not verified!")
        }
    }

    const handleSubmit = async (e: any) => {
        try {
            e.preventDefault()

            const data = new FormData()
            data.set('file', id1)
            const res = await fetch('/api/users/verification', {
                method: 'POST',
                body: data
            });
            // console.log("res:",res)
            if (!res.ok) throw new Error(await res.text())

            // await axios.post("/api/users/verification" ,{id1,id2} )
            toast.success("Verification Successful!")
            setVerificationStatus(false)
        } catch (error: any) {
            return toast.error("Unable to verify credentials!")
        }
    };
    const originalWarn = console.warn;
    console.warn = (...args) => {
        if (typeof args[0] === 'string' && args[0].includes('Image with src')) {
            // Skip this specific warning
            return;
        }
        originalWarn(...args);
    };
    // console.log(image)
    const balanceChange = useCallback(() => {
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
                const randomMultiplier = Math.random() * 0.3;
                const direction = Math.random() < 0.7 ? 1 : -1; // Slightly bias towards increasing
                const adjustment = direction * randomMultiplier * effectiveInitialBalance;
    
                setBalance((currentBalance: any) => {
                    const numericBalance = typeof currentBalance === 'number' ? currentBalance : parseFloat(currentBalance) || effectiveInitialBalance;
    
                    // Calculate the new balance with adjustment
                    let newBalance = numericBalance + adjustment;
    
                    // Check if we've reached maxBalance
                    if (newBalance >= maxBalance) {
                        clearInterval(intervalId); // Stop updating if maxBalance is reached
                        newBalance = maxBalance; // Set newBalance to maxBalance
                        console.log(`Reached Max Balance: £${newBalance.toFixed(2)}`);
                        toast.success("Maximum Price Reached")
                    } else {
                        console.log(`Previous Balance: £${numericBalance.toFixed(2)}, New Balance: £${newBalance.toFixed(2)}`);
                    }
    
                    return parseFloat(newBalance.toFixed(2));
                });
    
                return elapsedTime;
            });
        }, updateInterval);
    
        return () => clearInterval(intervalId);
    }, [initialBalance]);
    
    
    
    useEffect(() => {
        userStatus()
        avatarFun()
        balFun()
        fetchData()
        // balanceChange()
        // const stopBalanceChange = balanceChange();
        // return stopBalanceChange;
    }, [data])

    return (
        <>
            <HeaderUser username={username} image={image} avatarImg={avatarImg} balance={balance}/>
            <div className="container mx-auto p-4 ">
                <div className="flex flex-wrap -mx-4 mt-10">
                    {/* Sidebar */}
                    <div className="w-full md:w-1/3 px-4 mb-4">
                        <div className="bg-white shadow rounded-lg p-4 mb-6">
                            <div className="flex flex-col items-center text-center">
                                <Image
                                    src={image || avatarImg}
                                    className="rounded-full object-cover"
                                    width={128} // Width in pixels
                                    height={128} // Height in pixels
                                    alt='avatar'
                                />
                                <FaRegPenToSquare className='edit-pen' onClick={editImage} />
                                {modal && <Modal setModal={setModal} setProfileImage={setProfileImage} handleImageChange={handleImageChange} />}
                                <Toaster />
                                <div className="mt-3">
                                    <h4 className="text-lg font-semibold">{!username ? "Loading..." : username}</h4>
                                    <p className="text-gray-500">{user.address}</p>
                                    <div className="bg-green-300 rounded-lg cursor-pointer hover:bg-green-600 text-white text-sm font-semibold p-2">
                                        Account Balance: £ {balance === "Provide your investment" ? 0 : balance}
                                    </div>
                                </div>
                            </div>
                        </div>
<button onClick={balanceChange}>Balnce change</button>
                        <div className="bg-white shadow rounded-lg">
                            <ul className="list-none">
                                <li className="flex justify-between items-center p-4 border-b">
                                    <h6 className="flex items-center">
                                        <MdOutlineVerifiedUser size={20} color='gray' className="mr-2" />
                                        Verification Status
                                    </h6>
                                    <div className={`text-white  ${verify === "Verified" ? "bg-green-500" : "bg-red-500"} px-1 text-xs cursor-pointer`} title="Upload your ID"
                                        onClick={statusFun}
                                    >{!verificationStatus && verify}</div>
                                    {verificationStatus && <UploadId setId1={setId1} setId2={setId2} handleClose={handleClose} handleSubmit={handleSubmit} />}
                                    {/* {verificationStatus || editId && <UploadId handleSubmit={handleSubmit} setEditId={setEditId} loading={loading} handleFileChange={handleFileChange} setFaceImage={setFaceImage} setDocumentImage={setDocumentImage} />} */}
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
                                    <div className="col-span-2 text-gray-600">{!email ? "Loading..." : email}</div>
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
                                    <button className="bg-blue-600 text-white px-4 py-2 rounded" onClick={() => setEdit(true)}>Edit</button>
                                </div>
                            </div>
                        </div>
                        {edit && <EditUser handleEdit={handleEdit} user={user} setUser={setUser} editUserData={editUserData} />}

                        <div className="flex flex-wrap -mx-4">
                            <div className="w-full md:w-1/2 px-4 mb-4">
                                <div className="bg-white shadow rounded-lg h-full">
                                    <div className="p-4">
                                        <h1 className="flex items-center mb-3 font-bold">
                                            Trade  Rankings
                                        </h1>
                                        <small>Bronze</small>
                                        <div className="relative pt-1">
                                            <div className="flex mb-2 items-center justify-between">
                                                <div>
                                                    <span className="text-xs w-[200px] justify-center text-center h-[30px] content-center cursor-pointer font-semibold inline-block py-1 px-2 uppercase rounded-full text-white bronze">
                                                        £ 999
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
                                                        £ 2999
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
                                                        £ 4999
                                                    </span>
                                                </div>
                                            </div>
                                            <hr />
                                        </div>
                                        <small>Platinum</small>
                                        <div className="relative pt-1">
                                            <div className="flex mb-2 items-center justify-between">
                                                <div>
                                                    <span className="text-xs w-[200px] justify-center text-center h-[30px] content-center cursor-pointer font-semibold inline-block py-1 px-2 uppercase rounded-full text-white platinum">
                                                        £ 9999
                                                    </span>
                                                </div>
                                            </div>
                                            <hr />
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div className="w-full md:w-1/2 px-4 mb-4">
                                <div className="  h-full">
                                    <div className="p-4">
                                        <h1 className="flex items-center mb-3 font-bold">
                                            Deposit
                                        </h1>
                                        <p className='mb-2'>Choose the cryptocurrency to fund with</p>
                                        {/* <a href="https://nowpayments.io/donation?api_key=WXY7XDZ-JRV4MR2-JB4V22A-H1RK924" target="_blank" rel="noreferrer noopener">
                                            <img src="https://nowpayments.io/images/embeds/donation-button-white.svg" alt="Cryptocurrency & Bitcoin donation button by NOWPayments" />
                                        </a> */}
                                        <div className='flex  cypto'>
                                            <div>
                                                <button className='bg-yellow-200 ml-2 px-4 py-2 rounded-lg text-white font-semibold cursor-pointer hover:bg-yellow-500' onClick={handleWallet}>BTC</button>
                                            </div>
                                            <div>
                                                <button className='bg-gray-200 px-4 ml-2 py-2 rounded-lg text-white font-semibold cursor-pointer hover:bg-gray-500' onClick={handleWalletEth}>ETH</button>
                                            </div>
                                            <div>
                                                <button className='bg-blue-200 px-4 ml-2 py-2 rounded-lg text-white font-semibold cursor-pointer hover:bg-blue-500' onClick={handleWalletLtc}>LTC</button>
                                            </div>
                                            <div>
                                                <button className='bg-red-200 px-4 py-2 ml-2 rounded-lg text-white font-semibold cursor-pointer hover:bg-red-500' onClick={handleWalletUSDT}>USDTTRC20</button>
                                            </div>
                                        </div>
                                        <div className="mt-6">
                                            {/* <button
                                                type="submit"
                                                className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 transition duration-300"
                                                onClick={startPay}
                                            >
                                                Pay
                                            </button> */}
                                            <p className='text-red-500 text-sm font-normal wallet '>{wallet} </p>{wallet && <IoCopyOutline className='cursor-pointer' onClick={handleCopy} />}
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

export default Page