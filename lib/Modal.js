import React from 'react';

const Modal = ({ setModal, setProfileImage, handleImageChange }) => {
    const handleFileChange = (e) => {
        const file = e.target.files[0]; // Get the selected file
        if (file) {
            setProfileImage(file); // Pass the file object to the parent component
        }
    };

    return (
        <div>
            <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
            <form onSubmit={handleImageChange} className="bg-white rounded-lg shadow-lg w-96 p-6">
                <input 
                    type='file'
                    name='file'
                    onChange={(e)=>setProfileImage(e.target.files?.[0])}
                    className='mb-2'
                />
                <input type='submit' value="Upload" className="bg-blue-600 text-white px-4 py-1  rounded"/>
            </form>
            </div>
        </div>
    );
};

export default Modal;
{/* <div className="bg-white rounded-lg shadow-lg w-96 p-6">
</div> */}

{/* <h2 className="text-lg font-semibold mb-4">Upload Profile Image</h2>
<div className="mb-4">
    <input
        type="file"
        accept="image/*"
        onChange={handleFileChange} // Use the file change handler
        className="w-full px-3 py-2 border rounded"
    />
</div>
<div className="text-right">
    <button
        type="button"
        className="bg-gray-500 text-white px-4 py-2 rounded mr-2"
        onClick={() => setModal(false)} // Correctly toggles the modal's visibility
    >
        Cancel
    </button>
    <button
        type="button" // Changed to type="button" to prevent form submission
        className="bg-blue-600 text-white px-4 py-2 rounded"
        onClick={handleImageChange} // Call the function to upload the image
    >
        Upload
    </button>
</div> */}