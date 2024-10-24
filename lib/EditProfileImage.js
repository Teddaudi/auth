import React from 'react'

const EditProfileImage = () => {
    console.log("edit")
    return (
        <>
             <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
                <div className="bg-white rounded-lg shadow-lg w-96 p-6">
                    <h3 className="text-lg font-semibold mb-4">Upload ID or Passport for verification</h3>
                    <div>
                        <div className="mb-4">
                            <label className="block text-red-400 text-xs p-2">Front</label>
                            <input
                                type="file"
                                accept="image/*"
                                // onChange={(e) => handleFileChange(e, setDocumentImage)}
                                className="w-full px-3 py-2 border rounded"
                            />
                            <label className="block text-red-400 text-xs p-2">Back</label>
                            <input
                                type="file"
                                accept="image/*"
                                // onChange={(e) => handleFileChange(e, setFaceImage)}
                                className="w-full px-3 py-2 border rounded"
                            />
                        </div>
                        <div className="text-right">
                            <button
                                type="button"
                                className="bg-gray-500 text-white px-4 py-2 rounded mr-2"
                                // onClick={() => setEditId(prev => !prev)} // Correctly toggles the modal's visibility
                            >
                                Cancel
                            </button>
                            <button
                                type="submit"
                                className="bg-blue-600 text-white px-4 py-2 rounded"
                                onClick={handleSubmit}
                            >
                                {/* {loading ? "Verifying" : "Verify"} */}Verify
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default EditProfileImage