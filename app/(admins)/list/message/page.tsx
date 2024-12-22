"use client"
import React, { useState } from 'react'
import SendMessages from '../../../components/message';
import CreateWallet from '../../../components/wallet';

const Message = () => {
  const [message, setMessage] = useState<any>(false);
  const [wallet, setWallet] = useState(false)

  function handleMessage() {
    setMessage((prev: any) => !prev)

  }
  function handleWallet() {
    setWallet((prev: any) => !prev)
  }
  return (
    <div>
      <div className="flex flex-col space-y-4 items-center">
        <button
          className="bg-blue-500 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded-lg shadow-md transition duration-200 ease-in-out transform hover:scale-105"
          onClick={handleMessage}
        >
          Create Message
        </button>
        {message && <SendMessages />}

        <button
          className="bg-green-500 hover:bg-green-700 text-white font-semibold py-2 px-4 rounded-lg shadow-md transition duration-200 ease-in-out transform hover:scale-105"
          onClick={handleWallet}
        >
          Create Wallet
        </button>
        {wallet && <CreateWallet />}
      </div>
    </div>
  )
}

export default Message