"use client"
import { useRouter } from 'next/navigation'
import React, { useState } from 'react'
import toast from 'react-hot-toast'

const EditUser = ({ handleEdit,user,setUser,editUserData }) => {
  
    return (
        <>
            <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
                <div className="bg-white rounded-lg shadow-lg w-96 p-6">
                    <h3 className="text-lg font-semibold mb-4">Edit Profile</h3>
                    <div>
                        <div className="mb-4">
                            <label className="block text-gray-700">Full Name</label>
                            <input
                                type="text"
                                value={user.fullName} onChange={(e) => setUser({ ...user, fullName: e.target.value })}
                                className="w-full px-3 py-2 border rounded"
                            />
                        </div>
                        <div className="mb-4">
                            <label className="block text-gray-700">Phone</label>
                            <input
                                type="text"
                                value={user.phone} onChange={(e) => setUser({ ...user, phone: e.target.value })}
                                className="w-full px-3 py-2 border rounded"
                            />
                        </div>
                        <div className="mb-4">
                            <label className="block text-gray-700">Address</label>
                            <input
                                type="text"
                                value={user.address} onChange={(e) => setUser({ ...user, address: e.target.value })}
                                className="w-full px-3 py-2 border rounded"
                            />
                        </div>
                        <div className="text-right">
                            <button
                                type="button"
                                className="bg-gray-500 text-white px-4 py-2 rounded mr-2"
                                onClick={handleEdit}
                            >
                                Cancel
                            </button>
                            <button
                                type="submit"
                                className="bg-blue-600 text-white px-4 py-2 rounded"
                                onClick={editUserData}
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

export default EditUser