"use client"
import { useEffect, useState } from "react";
import Menu from "../components/Menu";
import Navbar from "../components/Navbar";
import Image from "next/image";
import Link from "next/link";
import axios from "axios";
import { UserContext } from "../util/context/context";
import { BeatLoader } from 'react-spinners'; // Optional: if you want a spinner from react-spinners

export default function DashboardLayout({ children }) {
  const [data, setData] = useState({});
  const [loading, setLoading] = useState(true); // Track loading state

  // const fetchData = async () => {
  //   try {
  //     const res = await axios.get('/api/users/me');
  //     const userData = res.data.data;
  //     setData(userData);
  //     setLoading(false); // Data fetched, stop loading
  //   } catch (error) {
  //     setLoading(false); // Stop loading even in case of error
  //     if (error.response) {
  //       const statusCode = error.response.status;
  //       // Handle specific HTTP error status codes
  //       switch (statusCode) {
  //         case 400:
  //           console.error("Bad Request - Invalid data provided.");
  //           break;
  //         case 401:
  //           console.error("Unauthorized - Please log in.");
  //           break;
  //         case 403:
  //           console.error("Forbidden - You do not have permission.");
  //           break;
  //         case 404:
  //           console.error("User data not found.");
  //           break;
  //         case 500:
  //           console.error("Internal Server Error - Try again later.");
  //           break;
  //         default:
  //           console.error(`Unexpected error occurred: ${statusCode}`);
  //       }
  //     } else {
  //       console.error("Network error or unknown error:", error.message);
  //     }
  //   }
  // };
  const fetchData = async (retryCount = 3) => {
    try {
      const res = await axios.get('/api/users/me');
      setData(res.data.data);
    } catch (error) {
      if (retryCount > 0) {
        await fetchData(retryCount - 1);
      } else {
        console.error("Fetch failed:", error);
      }
    } finally {
      setLoading(false);
    }
  };
  
  useEffect(() => {
    fetchData();
  }, []);

  return (
    <UserContext.Provider value={data}>
      <div className="h-screen flex relative">
        {/* Loading Spinner */}
        {loading && (
          <div className="absolute inset-0 flex justify-center items-center bg-white z-50">
            <BeatLoader size={15} color="#4A90E2" />
          </div>
        )}

        {/* LEFT */}
        <div className={`${loading ? 'hidden' : 'block'} w-[14%] md:w-[8%] lg:w-[16%] xl:w-[14%] p-4`}>
          <Link
            href="/home"
            className="flex items-center justify-center lg:justify-start gap-2"
          >
            {/* <Image src="/logo.png" alt="logo" width={32} height={32} /> */}
            <span className="hidden lg:block font-bold">Ezracapital Trades</span>
          </Link>
          <Menu />
        </div>

        {/* RIGHT */}
        <div className={`${loading ? 'hidden' : 'block'} w-[86%] md:w-[92%] lg:w-[84%] xl:w-[86%] bg-[#F7F8FA] overflow-scroll flex flex-col`}>
          <Navbar />
          {children}
        </div>
      </div>
    </UserContext.Provider>
  );
}
