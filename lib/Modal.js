import React from 'react';

const Modal = ({ setModal, setProfileImage, handleImageChange }) => {
    const handleFileChange = (e) => {
        const file = e.target.files[0]; // Get the selected file
        if (file) {
            setProfileImage(file); // Pass the file object to the parent component
        }
    };

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
            <form onSubmit={handleImageChange} className="bg-white rounded-lg shadow-lg w-96 p-6 flex flex-col space-y-4">
                <h2 className="text-lg font-semibold text-center">Upload Profile Image</h2>
                <input
                    type="file"
                    name="file"
                    onChange={(e) => setProfileImage(e.target.files?.[0])}
                    className="mb-2 border border-gray-300 rounded-md p-2"
                />
                <div className="flex justify-between">
                    <button
                        type="button"
                        onClick={() => setModal(false)}
                        className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700 transition duration-200"
                    >
                        Close
                    </button>
                    <button
                        type="submit"
                        className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition duration-200"
                    >
                        Upload
                    </button>
                </div>
            </form>
        </div>

    );
};

export default Modal;
