"use client"
import { useEffect, useState } from "react";
import Link from "next/link";
import axios from "axios";
import { UserContext } from "../util/context/context";
import { BeatLoader } from 'react-spinners'; // Optional: if you want a spinner from react-spinners
import AdminMenu from "../components/AdminMenu";
import AdminNavbar from "../components/AdminNavbar";

export default function AdminDashboardLayout({ children }) {
  const [data, setData] = useState({});
  const [loading, setLoading] = useState(true); // Track loading state


  const fetchData = async (retryCount = 3) => {
    try {
      const res = await axios.get('/api/users/me');
      const isAdmin = res.data.data.isAdmin;
      if(isAdmin){
        const users = await axios.get('/api/users/all')
        setData(users);

      }
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
            href="/admin-dashboard"
            className="flex items-center justify-center lg:justify-start gap-2"
          >
            {/* <Image src="/logo.png" alt="logo" width={32} height={32} /> */}
            <span className="hidden lg:block font-bold">Ezracapital Trades</span>
          </Link>
          <AdminMenu />
        </div>

        {/* RIGHT */}
        <div className={`${loading ? 'hidden' : 'block'} w-[86%] md:w-[92%] lg:w-[84%] xl:w-[86%] bg-[#F7F8FA] overflow-scroll flex flex-col`}>
          <AdminNavbar />
          {children}
        </div>
      </div>
    </UserContext.Provider>
  );
}
