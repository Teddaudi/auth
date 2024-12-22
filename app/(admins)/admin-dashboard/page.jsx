"use client"
import React, { useEffect, useState } from 'react';
import HomeCard from '../../components/HomeCard';
import UserCalendar from '../../components/UserClient';
import Deposit from '../../components/Deposit';
import Trade from '../../components/Trade';
import { useUser } from '../../util/context/context';
import AdminCard from '../../components/AdminCard';

const Home = () => {
  const [loading, setLoading] = useState(true); // Track loading state
  const data = useUser();
  const [access, setAccess] = useState(true);
  const usersTotal = data?.data?.data?.length || 0;
  const finalUsers = data?.data?.data || [];
  const users = data?.data?.data;
  const verifiedUsers = finalUsers.filter((user) => user.idVerification === true).length;
  const totalInvestment = finalUsers.reduce((sum, user) => {
    const investment = parseFloat(user.investment);
    return sum + (isNaN(investment) ? 0 : investment);
  }, 0);
  // console.log(data?.data?.data)
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
              onClick={(prev) => setAccess(!prev)} // Reset access state to hide the modal
              className="absolute top-2 right-2 bg-red-500 text-white rounded-full w-6 h-6 flex items-center justify-center font-bold shadow-md hover:bg-red-600"
            >
              X
            </button>
            <div className="flex justify-center items-center h-full">
              Your access token has expired. Please login again!
            </div>
          </div>
        )}

        {/* USER CARDS */}

        <div className="flex gap-4 justify-between flex-wrap">
          <AdminCard type="Total Income" amount={usersTotal} />
          <AdminCard type="Total Users" amount={totalInvestment} />
          <AdminCard type="Verified Users" amount={verifiedUsers} />
        </div>
        {/* MIDDLE CHARTS */}
        {/* <div className="w-full lg:w-1/3 h-[450px]">
            <UserCalendar />
          </div>
          <div className="w-full lg:w-2/3 h-[450px]">
            <Trade />
          </div>
          <div className="w-full lg:w-2/3 h-[450px]">
            <Deposit />
          </div> */}
        {/* <div className="flex gap-2 flex-col lg:flex-row">
          {data?.data?.data?.length}
        </div> */}
        <div className="">
          <table className="w-full  border-2 rounded-lg">
            <thead className="bg-gray-100">
              <tr>
                <th className="text-left p-3">Name</th>
                <th className="text-left p-3">Email</th>
                <th className="text-left p-3">Deposit</th>
                <th className="text-left p-3">Verification</th>
                {/* <th className="text-center p-3"></th>
                <th className="text-center p-3"></th>
                <th className="text-center p-3"></th>
                <th className="text-center p-3"></th> */}
              </tr>
            </thead>
            <tbody>
              {users?.map((user, index) => (
                <tr key={index} className=" hover:bg-gray-50">
                  <td className="p-3">{user?.fullName === "Provide your full name" ? "No name provided" : user.fullName}</td>
                  <td className="p-3">{user?.email}</td>
                  <td className="p-3">{user?.investment || 0}</td>
                  <td className="p-3">
                    <span className={`${user?.idVerification ? "bg-green-50" : "bg-red-50"} ${user.idVerification ? "text-green-700" : "text-red-700"}  px-3 py-1 ring-1 ${user.idVerification ? "ring-green-200" : "ring-red-200"}  text-xs rounded-md`}>
                      {!user?.idVerification ? "Not Verified" : "Verified"}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Home;
