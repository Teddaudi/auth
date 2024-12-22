"use client"
import { useCallback, useState } from "react";
import { useUser } from "../../../util/context/context";
import { MdCancel, MdDelete, MdModeEdit } from "react-icons/md";
import { RiSave3Fill } from "react-icons/ri";
import { VscDebugStart } from "react-icons/vsc";
import axios from "axios";

type Parent = {
  id: number;
  name: string;
  email?: string;
  students: string[];
  phone: string;
  address: string;
};

const columns = [
  {
    header: "Name",
    accessor: "name",
  },
  {
    header: "Email",
    accessor: "Email",
    className: "hidden md:table-cell",
  },
  {
    header: "Deposit",
    accessor: "deposit",
    className: "hidden lg:table-cell",
  },
  {
    header: "Verification",
    accessor: "verification",
    className: "hidden lg:table-cell",
  },
  {
    header: "Actions",
    accessor: "action",
  },
];

const Users = () => {
  // const renderRow = (item: Parent) => (
  //   <tr
  //     key={item.id}
  //     className="border-b border-gray-200 even:bg-slate-50 text-sm hover:bg-lamaPurpleLight"
  //   >
  //     <td className="flex items-center gap-4 p-4">
  //       <div className="flex flex-col">
  //         <h3 className="font-semibold">{item.name}</h3>
  //       </div>
  //     </td>
  //     <td className="hidden md:table-cell">{item?.email}</td>
  //     <td className="hidden md:table-cell">{item.phone}</td>
  //     <td className="hidden md:table-cell">{item.address}</td>
  //     <td>
  //       <div className="flex items-center gap-2">
  //         {role === "admin" && (
  //           <>
  //             <FormModal table="parent" type="update" data={item} />
  //             <FormModal table="parent" type="delete" id={item.id} />
  //           </>
  //         )}
  //       </div>
  //     </td>
  //   </tr>
  // );
  const data: any = useUser();
  const [backIdBase64, setBackIdBase64] = useState("");
  const [frontIdBase64, setFrontIdBase64] = useState("");
  const [currentEditIndex, setCurrentEditIndex] = useState<number | null>(null);
  const [edit, setEdit] = useState(false)
  const [deposit, setDeposit] = useState(0)
  const [usersDeleted, setUsersDeleted] = useState(0)
  const [balance, setBalance] = useState<any>(20)
  const [elapsedTime, setElapsedTime] = useState<number>(0);
  const [userId, setUserId] = useState(0)
  const users = data?.data?.data;

  function handleDeposit(user: any, index: number) {
    setEdit((prev) => !prev);
    setCurrentEditIndex(index);
  }
  async function deleteUser(user: any) {
    try {
      setUsersDeleted(prev => prev + 1)
      const deleteUser = await axios.delete('/api/users/delete', {
        data: {
          userId: user._id,
        },
      })
      if (deleteUser) {
        return alert("User deleted successfully!")
      } else {
        return alert("User not successfully deleted!")
      }
    } catch (error: any) {
      console.log(error.message)
    }
  }
  async function saveDeposit(user: any) {
    try {
      const data = await axios.put('/api/users/edit/deposit', {
        userId: user._id,
        deposit: deposit
      })
      if (data) {
        alert("Deposit price updated successfully!")
      } else {
        return alert("Deposit price not updated!")
      }
    } catch (error: any) {
      alert(error.message)
    }
  }
  async function handleTrade(user: any) {
    const initialUserBalance = parseFloat(user.investment) || 100;
    const userIds = user._id;
    await balanceChange(initialUserBalance, userIds)
  }
  const balanceChange = useCallback((initialBalance: number, userIds: any) => {
    const updateInterval = 60 * 1000; // 1 minute in milliseconds
    const maxTime = 15 * 60 * 1000; // 15 minutes in milliseconds
    const startTime = Date.now();
    const effectiveInitialBalance = initialBalance || 100; // Fallback to 100 if initialBalance is zero or undefined
    const maxBalance = effectiveInitialBalance * 10; // Set max balance to 10 times the initial

    const intervalId = setInterval(() => {
      setElapsedTime((prevTime) => {
        const elapsedTime = Date.now() - startTime;

        if (elapsedTime >= maxTime) {
          clearInterval(intervalId);
          return maxTime;
        }

        // Generate a random multiplier for the balance adjustment
        const randomMultiplier = Math.random() * 10;
        const direction = Math.random() < 0.7 ? 1 : -1; // Slightly bias towards increasing
        const adjustment = direction * randomMultiplier * effectiveInitialBalance;

        setBalance(async (currentBalance: any) => {
          const numericBalance = typeof currentBalance === 'number' ? currentBalance : parseFloat(currentBalance) || effectiveInitialBalance;

          // Calculate the new balance with adjustment
          let newBalance = numericBalance + adjustment;
          const formattedBalance = parseFloat(newBalance.toFixed(2));

          try {
            await axios.put('/api/users/edit/deposit', {
              userId: userIds,
              deposit: formattedBalance
            });
          } catch (error) {
            alert("Failed to update balance");
          }

          // Check if we've reached maxBalance
          if (newBalance >= maxBalance) {
            clearInterval(intervalId); // Stop updating if maxBalance is reached
            (async () => {
              try {
                await axios.put('/api/users/edit/deposit', {
                  userId: userIds,
                  deposit: formattedBalance
                });
                alert("Maximum Price Reached");
              } catch (error) {
                console.error("Error updating balance after reaching max:", error);
                alert("Failed to update balance after reaching max");
              }
            })();
          }

          return parseFloat(newBalance.toFixed(2));
        });

        return elapsedTime;
      });
    }, updateInterval);

    return () => clearInterval(intervalId);
  }, []);
  function handleUserVerification(data: any) {
    try {
      const base64Front = arrayBufferToBase64(data.images.frontIdImage.data)
      const base64Back = arrayBufferToBase64(data.images.backIdImage.data);
      setUserId(data._id)
      if (!base64Front && !base64Back) {
        return alert("No documents uploaded!")
      }
      setFrontIdBase64(base64Front)
      setBackIdBase64(base64Back)
    } catch (error) {
      return alert("No documents uploaded!")
    }
  }
  const arrayBufferToBase64 = (buffer: any) => {
    let binary = '';
    const bytes = new Uint8Array(buffer);
    const length = bytes.byteLength;
    for (let i = 0; i < length; i++) {
      binary += String.fromCharCode(bytes[i]);
    }
    return window.btoa(binary);
  };
  function handleApproval(id: number) {
    axios
        .put('/api/users/verification/approval', { userId: id })
        .then((response) => {
            if (response.data.success) {
                return alert('Approval successful');
            }
        })
        .catch((error) => {
            alert('Error during approval');
        });
}
  return (
    <div className="bg-white p-4 rounded-md flex-1 m-4 mt-0">
      {/* <Table columns={columns} renderRow={renderRow} data={parentsData} /> */}
      <div className=" m-2 shadow-md mx-4 border-2">
        <table className="w-full border-2 overflow-x-hidden rounded-lg">
          <thead className="bg-gray-100">
            <tr>
              <th className="text-left p-3">Name</th>
              <th className="text-left p-3">Email</th>
              <th className="text-left p-3">Deposit</th>
              <th className="text-left p-3">Verification</th>
              <th className="text-center p-3"></th>
              <th className="text-center p-3"></th>
              <th className="text-center p-3"></th>
              <th className="text-center p-3"></th>
            </tr>
          </thead>
          <tbody>
            {users?.map((user: any, index: any) => (
              <tr key={index} className="border-b border-gray-200 hover:bg-gray-50">
                <td className="p-3">{user.fullName === "Provide your full name" ? "No name provided" : user.fullName}</td>
                <td className="p-3">{user.email}</td>
                <td className="p-3">
                  <div className='flex justify-center text-center'>
                    £ {user.investment === "Provide your investment" ? 0 : user.investment}
                    {
                      currentEditIndex === index && edit && (
                        <input type='number' onChange={(e: any) => setDeposit(e.target.value)} className='w-12 h-10 border rounded-lg ml-2' />
                      )
                    }
                    {
                      currentEditIndex === index && edit ? <MdCancel className='ml-1 cursor-pointer hover:text-red-600 text-center justify-center text-red-500' onClick={() => setEdit(false)} /> : <MdModeEdit className='ml-1 cursor-pointer hover:text-green-600 text-center justify-center text-yellow-500'
                        onClick={() => handleDeposit(user, index)}
                      />
                    }



                  </div>
                </td>
                <td className="p-3">
                  <span className={`${user.idVerification ? "bg-green-50" : "bg-red-50"} ${user.idVerification ? "text-green-700" : "text-red-700"}  px-3 py-1 ring-1 ${user.idVerification ? "ring-green-200" : "ring-red-200"}  text-xs rounded-md`}>
                    {!user.idVerification ? "Not Verified" : "Verified"}
                  </span>
                </td>
                <td className="p-3"> <MdDelete className='text-red-300 hover:text-red-600 cursor-pointer' onClick={() => deleteUser(user)} /></td>
                <td className="p-3"> <RiSave3Fill className='text-green-300 hover:text-green-600 cursor-pointer' size={20} onClick={() => saveDeposit(user)} /></td>
                <td className="p-3"> <VscDebugStart className='text-red-300 hover:text-red-600 cursor-pointer' size={20} onClick={() => handleTrade(user)} /></td>
                <td className="p-3 text-green-200 cursor-pointer hover:text-green-500 font-medium" onClick={() => handleUserVerification(user)}> Verify</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className="flex flex-col items-center space-y-6 p-6 bg-gray-50 rounded-lg shadow-md">
                        <div className="flex flex-col items-center">
                            <h2 className="text-lg font-semibold text-gray-700 mb-2">Front ID</h2>
                            {frontIdBase64 ? (
                                <img
                                    src={`data:image/png;base64,${frontIdBase64}`}
                                    alt="Front ID"
                                    className="w-48 h-48 object-cover rounded-lg border-2 border-gray-300 shadow-md"
                                />
                            ) : (
                                <p className="text-sm text-gray-500 italic">Loading Front Image...</p>
                            )}
                        </div>

                        <div className="flex flex-col items-center">
                            <h2 className="text-lg font-semibold text-gray-700 mb-2">Back ID</h2>
                            {backIdBase64 ? (
                                <img
                                    src={`data:image/png;base64,${backIdBase64}`}
                                    alt="Back ID"
                                    className="w-48 h-48 object-cover rounded-lg border-2 border-gray-300 shadow-md"
                                />
                            ) : (
                                <p className="text-sm text-gray-500 italic">Loading Back Image...</p>
                            )}
                        </div>

                        {/* Approve Button */}
                        <button
                            onClick={() => handleApproval(userId)}
                            className="mt-4 px-6 py-3 bg-green-600 text-white font-semibold rounded-lg shadow-md hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2"
                        >
                            Approve Verification
                        </button>
                    </div>
    </div>
  );
};

export default Users;