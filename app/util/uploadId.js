import { useRouter } from 'next/navigation'
import React, { useState } from 'react'
import toast from 'react-hot-toast'
import verifyId from './userIdVerification'

const UploadId = ({ setId1,setId2,handleClose, handleSubmit }) => {

    return (
        <>
            <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
                <div className="bg-white rounded-lg shadow-lg w-96 p-6">
                    <h3 className="text-lg font-semibold mb-4">Upload ID or Passport for verification</h3>
                    <p className='text-red-500 text-sm font-medium text-center '>Your images should not exceed 2MB</p>
                    <form onSubmit={handleSubmit}>
                        <div className="mb-4">
                            <label className="block text-red-400 text-xs p-2">Front</label>
                            <input
                                type="file"
                                accept="image/*"
                                onChange={(e) => setId1(e.target.files?.[0])}
                                className="w-full px-3 py-2 border rounded"
                            />
                            <label className="block text-red-400 text-xs p-2">Back</label>
                            <input
                                type="file"
                                accept="image/*"
                                onChange={(e) => setId2(e.target.files?.[0])}
                                className="w-full px-3 py-2 border rounded"
                            />
                        </div>
                        <div className="text-right">
                            <button
                                type="button"
                                className="bg-gray-500 text-white px-4 py-2 rounded mr-2"
                                onClick={handleClose} // Correctly toggles the modal's visibility
                            >
                                Cancel
                            </button>
                            <button
                                type="submit"
                                className="bg-blue-600 text-white px-4 py-2 rounded"
                                // onClick={handleSubmit}
                            >
                                Verify
                            </button>
                        </div>
                    </form>
                </div>
            </div>

        </>
    )
}

export default UploadId