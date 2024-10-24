"use client"
import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { useRouter } from 'next/navigation'
import toast from 'react-hot-toast'


const Page = () => {
  const router = useRouter();
  const [user, setUser] = useState({
    username: "",
    email: "",
    password: ""
  })
  const [buttonDisabled, setButtonDisabled] = useState(false)
  const onSignUp = async () => {
    try {
      const data = {
        name: user.username,
        email: user.email
      }
      await axios.post("api/users/signup", user)
      await axios.post("/api/mail",data)
      router.push('/signin')
    } catch (error: any) {
      console.log("signup:", error.message)
      toast.error(error.message)
    }
  }
  useEffect(() => {
    if (user.email.length > 0 && user.password.length > 0 && user.username.length > 0) {
      setButtonDisabled(false)
    } else {
      setButtonDisabled(true)
    }
  }, [user])

  return (
    <div>
      <section className=" ">
        <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
          <div className="w-full rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 ">
            <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
              <h1 className="text-xl font-bold leading-tight tracking-tight  md:text-2xl ">
                Create an account
              </h1>
              <div className="space-y-4 md:space-y-6" >
                <div>
                  <label htmlFor="username" className="block mb-2 text-sm font-medium  ">Username</label>
                  <input type="text" name="username" id="username"
                    value={user.username} onChange={(e) => setUser({ ...user, username: e.target.value })}
                    placeholder="username" className=" border border-gray-300  text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5   dark:placeholder-gray-400  dark:focus:ring-blue-500 dark:focus:border-blue-500" required />
                </div>
                <div>
                  <label htmlFor="email" className="block mb-2 text-sm font-medium  ">Your Email</label>
                  <input type="email" name="email" id="email"
                    value={user.email} onChange={(e) => setUser({ ...user, email: e.target.value })}
                    className=" border border-gray-300  text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5   dark:placeholder-gray-400  dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="name@company.com" required />
                </div>
                <div>
                  <label htmlFor="password" className="block mb-2 text-sm font-medium  ">Password</label>
                  <input type="confirm-password" name="password" id="password"
                    value={user.password} onChange={(e) => setUser({ ...user, password: e.target.value })}
                    placeholder="••••••••" className=" border border-gray-300  text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5   dark:placeholder-gray-400  dark:focus:ring-blue-500 dark:focus:border-blue-500" required />
                </div>
                <button type="submit" className="w-full  bg-blue-400 text-white hover:bg-blue-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800" onClick={onSignUp}>{buttonDisabled ? "No signup" : "Signup"}</button>
                <p className="text-sm font-light ">
                  Already have an account? <a href="/signin" className="font-medium text-primary-600 hover:underline dark:text-primary-500">Sign in here</a>
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}

export default Page