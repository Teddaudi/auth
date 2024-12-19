"use client"
import axios from 'axios'
import React, { useState } from 'react'
import toast from 'react-hot-toast'
import { IoCopyOutline } from 'react-icons/io5'

const Deposit = () => {
    const [wallet, setWallet] = useState("")
    const [idVerification, setIdVerification] = useState(false)

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
            const response = await axios.get(`/api/wallets?name=BTC`);
            const walletValue = response.data.wallets[0].wallet;
            setWallet(walletValue ? walletValue : "Loading...");

        } catch (error: any) {
            console.error("Error fetching wallet:", error.message);
        }
    }

    async function handleWalletEth() {
        try {
            const response = await axios.get(`/api/wallets?name=ETH`);
            const walletValue = response.data.wallets[0].wallet;
            setWallet(walletValue ? walletValue : "Loading...");

        } catch (error: any) {
            console.error("Error fetching wallet:", error.message);
        }
    }

    async function handleWalletLtc() {
        try {
            const response = await axios.get(`/api/wallets?name=LTC`);
            const walletValue = response.data.wallets[0].wallet;
            setWallet(walletValue ? walletValue : "Loading...");

        } catch (error: any) {
            console.error("Error fetching wallet:", error.message);
        }
    }

    async function handleWalletUSDT() {
        try {
            const response = await axios.get(`/api/wallets?name=USDTTRC20`);
            const walletValue = response.data.wallets[0].wallet;
            setWallet(walletValue ? walletValue : "Loading...");

        } catch (error: any) {
            console.error("Error fetching wallet:", error.message);
        }
    }
    return (
        <div>
            <div className="w-full px-4 mb-4 bg-white">
                <div className="  h-full">
                    <div className="p-4">
                        <h1 className="flex items-center mb-3 font-bold">
                            Deposit
                        </h1>
                        <p className='mb-2'>Choose the cryptocurrency to fund with</p>
                        {/* <a href="https://nowpayments.io/donation?api_key=WXY7XDZ-JRV4MR2-JB4V22A-H1RK924" target="_blank" rel="noreferrer noopener">
                                            <img src="https://nowpayments.io/images/embeds/donation-button-white.svg" alt="Cryptocurrency & Bitcoin donation button by NOWPayments" />
                                        </a> */}
                        <div className='flex cypto'>
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
                            <p className='text-red-500 text-sm font-normal wallet '>{wallet} </p>{wallet && <IoCopyOutline className='cursor-pointer' onClick={handleCopy} />}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Deposit