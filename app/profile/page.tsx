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
import VerificationMessage from "../../lib/verificationPop"
import { GrTransaction } from "react-icons/gr";


const MAX_FILE_SIZE = 25 * 1024 * 1024;

const Page = () => {
    const [edit, setEdit] = useState(false)
    const [id1, setId1] = useState<File | null>(null);
    const [id2, setId2] = useState<File | null>(null);
    const [idVerification, setIdVerification] = useState(false)
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
    const [balance, setBalance] = useState<any>(0)
    const [initialBalance, setInitialBalance] = useState(balance);
    // const [loading, setLoading] = useState(false);
    const [wallet, setWallet] = useState("")
    const [profileImage, setProfileImage] = useState("")
    const [modal, setModal] = useState(false)
    const [elapsedTime, setElapsedTime] = useState<number>(0); // Track elapsed time
    const [verificationMessages, setVerificationMessages] = useState(false)
    const [clientWithdrawal, setClientWithdrawal] = useState<number | null>(null)
    const [loading, setLoading] = useState<boolean>(true)
    const [withdrawalHistory, setWithdrawalHistory] = useState([])
    async function Test() {
        await axios.post('/api/mail', { email: 'daudited@gmail.com', name: 'Daudi' })
        // console.log("clicked")
    }


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
            setBalance(userData.investment);
            setIdVerification(userData.idVerification)
            setWithdrawalHistory(userData.withdrawal)
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
    };
    const editUserData = async () => {
        try {
            await axios.put('/api/users/me', user);
            toast.success("Update successful!")
            setEdit(false);
        } catch (error: any) {
            if (error.response) {
                const statusCode = error.response.status;

                // Handle specific HTTP error codes
                switch (statusCode) {
                    case 400:
                        console.error("Bad Request - Please check the data provided.");
                        break;
                    case 401:
                        console.error("Unauthorized - You need to log in.");
                        // Optionally redirect to login or show a login prompt
                        break;
                    case 403:
                        console.error("Forbidden - You don't have permission to edit this data.");
                        break;
                    case 404:
                        console.error("User not found - Unable to update.");
                        break;
                    case 500:
                        console.error("Server error - Please try again later.");
                        break;
                    default:
                        console.error(`Unexpected error: ${statusCode}`);
                }
            } else {
                // Handle network or unexpected errors
                console.error("Failed to update due to network error or unknown issue:", error.message);
            }
        }
    };


    const balFun = async () => {
        try {
            const res = await axios.get('/api/users/me');
            setBalance(res.data.data.investment);
        } catch (error: any) {
            if (error.response) {
                const statusCode = error.response.status;

                // Handle specific HTTP error codes
                switch (statusCode) {
                    case 400:
                        console.error("Bad Request - Unable to retrieve balance.");
                        break;
                    case 401:
                        console.error("Unauthorized - Please log in to view your balance.");
                        // Optionally, redirect to login page or show a login prompt
                        break;
                    case 403:
                        console.error("Forbidden - You do not have access to this information.");
                        break;
                    case 404:
                        console.error("User not found - Unable to retrieve balance.");
                        break;
                    case 500:
                        console.error("Server error - Please try again later.");
                        break;
                    default:
                        console.error(`Unexpected error: ${statusCode}`);
                }
            } else {
                // Handle network or unknown errors
                console.error("Failed to fetch balance due to network error or unknown issue:", error.message);
            }
        }
    };

    function statusFun() {
        // console.log("Clicked")
        setVerificationStatus(true)

    }


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
        e.preventDefault();

        try {
            if (!profileImage) {
                toast.error("Please select an image to upload.");
                return;
            }

            const data = new FormData();
            data.set('file', profileImage);

            const res = await fetch('/api/users/edit/image', {
                method: 'PUT',
                body: data,
            });

            if (!res.ok) {
                const errorMessage = await res.text();
                toast.error(errorMessage || "Failed to upload image.");
            }

            setModal(false);
            toast.success("Upload successful!");

        } catch (error: unknown) {
            console.error("Error uploading profile image:", error);

            if (error instanceof TypeError) {
                toast.error("Network error. Please check your connection.");
            } else if (error instanceof Error) {
                toast.error(error.message || "Profile image upload unsuccessful.");
            } else {
                toast.error("An unknown error occurred during the upload.");
            }
        }
    };

    const avatarFun = async () => {
        try {
            const response = await axios.get('/api/users/edit/image');

            if (response.data?.success) {
                setImage(response.data.image); // Set the Base64 image string
            } else {
                console.error("Failed to fetch image:", response.data?.message || "Unknown error occurred.");
                // toast.error(response.data?.message || "Could not load profile image.");
            }
        } catch (error: any) {
            if (axios.isAxiosError(error)) {
                console.error("API request failed:", error.response?.data?.message || error.message);
                // toast.error(error.response?.data?.message || "Network or server error. Please try again.");
            } else {
                console.error("Unexpected error:", error);
                // toast.error("An unexpected error occurred.");
            }
        }
    };

    const handleClose = async () => {
        setVerificationStatus(false)
    }
    // const userStatus = async () => {
    //     try {
    //         const verification = await axios.get('/api/users/verification/status')
    //         // console.log("verification:",verification)
    //         if (verification.data.data) {
    //             setVerify("Verified")
    //         } else {
    //             setVerify("Not verified")
    //         }
    //     } catch (error) {
    //         return toast.error("You are not verified!")
    //     }
    // }


    const handleSubmit = async (e: any) => {
        try {
            e.preventDefault();
            // Check if a file is selected
            if (!id1 && !id2) {
                toast.error("No file selected. Please upload a file for verification.");
                return; // Stop execution if no file is selected
            }

            const data = new FormData();

            if (id1) {
                data.set('file[0]', id1);
            }

            if (id2) {
                data.set('file[1]', id2);
            }


            const res = await fetch('/api/users/verification', {
                method: 'POST',
                body: data,
            });

            if (!res.ok) throw new Error(await res.text());;

            toast.success("Files uploaded successfully!");
            setVerificationStatus(false);
        } catch (error: any) {
            console.log(error)
            toast.error("Unable to upload credentials!");
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
        const updateInterval = 3 * 60 * 60 * 1000; // 3 hours in milliseconds
        const maxTime = 24 * 60 * 60 * 1000; // 24 hours in milliseconds

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
        const withdrawalFun = async () => {
            try {
                const response = await axios.get('/api/users/withdrawal');
                if (response.data && response.data.withdrawal) {
                    setClientWithdrawal(response.data.withdrawal);
                } else {
                    console.error('No withdrawal data found.');
                    setClientWithdrawal(0); // Explicitly set to 0 if no data
                }
            } catch (error: any) {
                console.error('Error fetching withdrawal:', error.message);
                setClientWithdrawal(0); // Handle errors gracefully
            } finally {
                setLoading(false); // Ensure loading is set to false in all cases
            }
        };

        withdrawalFun()

    }, [])

    useEffect(() => {
        fetchData()
        if (balance === 0) {
            setVerificationMessages(true)
        }
        // userStatus()
        avatarFun()
        balFun()
    }, [data])

    return (
        <>
            <HeaderUser username={username} image={image} avatarImg={avatarImg} balance={balance} />
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
                        <Toaster />

                        {/* <button onClick={balanceChange}>Balnce change</button> */}
                        <div className="bg-white shadow rounded-lg">
                            <ul className="list-none">
                                <li className="flex justify-between items-center p-4 border-b">
                                    <h6 className="flex items-center">
                                        <MdOutlineVerifiedUser size={20} color='gray' className="mr-2" />
                                        Verification Status
                                    </h6>
                                    <div className={`text-white  ${idVerification ? "bg-green-500" : "bg-red-500"} px-1 text-xs cursor-pointer`} title="Upload your ID"
                                        onClick={statusFun}
                                    >{idVerification ? "Verified" : "Not Verified"}</div>
                                    {verificationStatus && <UploadId setId1={setId1} setId2={setId2} handleClose={handleClose} handleSubmit={handleSubmit} />}
                                    {verificationMessages && <VerificationMessage setVerificationMessages={setVerificationMessages} />}
                                </li>
                            </ul>
                        </div>
                        <div className="bg-white shadow-lg rounded-lg mt-6 p-4">
                            <h2 className="text-lg font-semibold text-gray-800 border-b pb-2 mb-4">
                                Withdrawal History
                            </h2>
                            {Array.isArray(withdrawalHistory) && withdrawalHistory.length > 0 ? (
                                <ul className="space-y-3">
                                    {withdrawalHistory.map((clientWithdrawal: any, index: number) => (
                                        <li
                                            key={index}
                                            className="flex justify-between items-center bg-gray-50 hover:bg-gray-100 transition duration-200 rounded-md p-3 shadow-sm"
                                        >
                                            <span className="text-gray-600 text-sm">Withdrawal #{index + 1}</span>
                                            <p className="text-red-500 font-medium text-lg">£ {clientWithdrawal}</p>
                                        </li>
                                    ))}
                                </ul>
                            ) : (
                                <p className="text-gray-500 text-center py-4">
                                    No withdrawal history available.
                                </p>
                            )}
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