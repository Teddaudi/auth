// import Image from "next/image"
"use client"
import avatar from "../../images/avatar.png"
import Image from "next/image"
import { MdOutlineVerified } from "react-icons/md";
import { useUser } from "../util/context/context";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";
import toast from "react-hot-toast";


const AdminNavbar = () => {
  const data: any = useUser()
  const verified = data?.idVerification;
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [loading, setLoading] = useState(false); // Loading state for logout
  const router = useRouter();


  const withdrawInit =async()=>{
    router.push('/list/withdraw');
  }

  const logOut = async () => {
    setLoading(true); // Set loading to true at the start of the request
    try {
      await axios.get('/api/users/logout');
      toast.success('Logout successful');
      router.push('/signin');
    } catch (error: any) {
      toast.error(error.message);
    } finally {
      setLoading(false); // Stop loading when the request completes
    }
  };

  const toggleUserDropdown = () => {
    setIsDropdownOpen((prev) => !prev);
  };

  const bufferToBase64 = (buffer: any) => {
    if (buffer?.data) {
      const base64String = Buffer.from(buffer.data).toString("base64");
      return `data:image/png;base64,${base64String}`;
    }
    return null;
  };

  const imageSrc = bufferToBase64(data?.image);

  useEffect(() => {
    const handleOutsideClick = (e: any) => {
      if (!e.target.closest('.dropdown-container')) {
        setIsDropdownOpen(false);
      }
    };
    if (isDropdownOpen) {
      document.addEventListener('click', handleOutsideClick);
    }
    return () => {
      document.removeEventListener('click', handleOutsideClick);
    };
  }, [isDropdownOpen]);
  return (
    <div className='flex items-center justify-between p-4'>
      <div className='flex items-center gap-1 justify-end w-full'>
        <div className='flex flex-col'>
          {/* <span className="text-xs leading-3 font-medium">John Doe</span> */}
          {/* <MdOutlineVerified className={`${verified ? 'text-green-600' : 'text-red-600'}`} /> */}

        </div>
        {/* <Image src={!imageSrc ? avatar : imageSrc} alt="" width={36} height={36} className="rounded-full" /> */}

        <ul className="flex items-center gap-5">
          <li className="relative dropdown-container" onClick={toggleUserDropdown}>
            <Image
              className="inline-block h-8 w-8 rounded-full ring-2 ring-white cursor-pointer"
              src={imageSrc || avatar}
              alt="User avatar"
              width={32}
              height={32}
              objectFit="cover"
            />
            <ul
              className={`absolute ${isDropdownOpen ? 'block' : 'hidden'}  right-0 top-12 w-28 rounded-lg shadow-md z-20`}
            >
              <li className="hover:bg-gray-400 rounded-t-lg  bg-white rounded-b-lg text-gray-700 hover:text-white">
                <button
                  className={`block px-5 py-2 w-full text-left ${loading ? 'opacity-50 cursor-not-allowed' : ''}`}
                  onClick={logOut}
                  disabled={loading} // Disable button while loading
                >
                  {loading ? "Logging out..." : "Logout"}
                </button>
              </li>
            </ul>
          </li>
        </ul>
      </div>
    </div>
  )
}

export default AdminNavbar