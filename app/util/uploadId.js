"use client"
import { useRouter } from 'next/navigation'
import React, { useState } from 'react'
import toast from 'react-hot-toast'
import verifyId from './userIdVerification'

const UploadId = () => {
    const [image, setUserImage] = useState()
    console.log("image:", image)
    return (
        <>
            <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
                <div className="bg-white rounded-lg shadow-lg w-96 p-6">
                    <h3 className="text-lg font-semibold mb-4">Edit Profile</h3>
                    <div>
                        <div className="mb-4">
                            <label className="block text-red-400 text-xs p-2">Upload Id or Passport for verification!</label>
                            <input
                                type="file"
                                value={image} onChange={(e) => setUserImage(e.target.value)}
                               
                                className="w-full px-3 py-2 border rounded"
                            />
                        </div>
                        <div className="text-right">
                            <button
                                type="button"
                                className="bg-gray-500 text-white px-4 py-2 rounded mr-2"
                            // onClick={handleEdit}
                            >
                                Cancel
                            </button>
                            <button
                                type="submit"
                                className="bg-blue-600 text-white px-4 py-2 rounded" onClick={verifyId}
                            // onClick={editUserData}
                            >
                                Save
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default UploadId