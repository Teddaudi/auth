"use client"
import React, { useEffect, useState } from 'react';
import HomeCard from '../../components/HomeCard';
import UserCalendar from '../../components/UserClient';
import Deposit from '../../components/Deposit';
import Trade from '../../components/Trade';
import { useUser } from '../../util/context/context';
import Link from 'next/link';

const Home = () => {
  const [loading, setLoading] = useState(true); // Track loading state
  const data = useUser();
  const [access, setAccess] = useState(true);

  useEffect(() => {
    if (!data) {
      setAccess(false);
    }
  }, [data]);

  return (
    <div className="p-4 flex gap-4 flex-col md:flex-row">
      {/* LEFT */}
      <div className="w-full lg:w-2/3 flex flex-col gap-8">
        {/* ACCESS RESTRICTION MODAL */}
        {!access && (
          <div className="bg-black max-h-[400px] text-white p-4 fixed top-0 left-0 right-0 z-50 shadow-lg">
            <button
              onClick={() => setAccess(true)} // Reset access state to hide the modal
              className="absolute top-2 right-2 bg-red-500 text-white rounded-full w-6 h-6 flex items-center justify-center font-bold shadow-md hover:bg-red-600"
            >
              X
            </button>
            <Link href={'/signin'}>
              <div className="flex justify-center items-center h-full">
                Your access token has expired. Please login again!
              </div>
            </Link>
          </div>
        )}

        {/* USER CARDS */}
        <div className="flex gap-4 justify-between flex-wrap">
          <HomeCard type="Current Balance" />
        </div>

        {/* MIDDLE CHARTS */}
        <div className="flex gap-2 flex-col lg:flex-row">
          <div className="w-full lg:w-1/3 h-[450px]">
            <UserCalendar />
          </div>
          <div className="w-full lg:w-2/3 h-[450px]">
            <Trade />
          </div>
          <div className="w-full lg:w-2/3 h-[450px]">
            <Deposit />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
