"use client"
import axios from 'axios';
import { useRouter } from 'next/navigation';
import React, { useEffect, useState } from 'react'
import toast from 'react-hot-toast';
// import signUpResponse from '../util/mail/sendMail'
// import paymentResponse from '../util/mail/paymentInit'


const Page = () => {
  const router = useRouter();
  const [user, setUser] = useState({
    email: "",
    password: ""
  })
  const [admin, setAdmin] = useState()
  const [buttonDisabled, setButtonDisabled] = useState(false)
  const onLogin = async () => {
    try {
      const userData:any = await axios.post('api/users/login', user)
      console.log("userData:", userData.data.user.isAdmin)
      setAdmin(userData.data.user.isAdmin)
      if (!userData.data.user.isAdmin) {

        router.push('/profile')
      }else{
        router.push('/admin/dashboard')
      }
      toast.success("Login successful")
    } catch (error: any) {
      toast.error(error.message)
    }
  }
  useEffect(() => {
    if (user.email.length > 0 && user.password.length > 0) {
      setButtonDisabled(false)
    } else {
      setButtonDisabled(true)
    }
  }, [user])

  return (
    <div>
      <section className="">
        <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
          <div className="w-full  rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 ">
            <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
              <h1 className="text-xl font-bold leading-tight tracking-tight  md:text-2xl ">
                Sign In
              </h1>
              <div className="space-y-4 md:space-y-6" >
                <div>
                  <label htmlFor="email" className="block mb-2 text-sm font-medium  ">Your email</label>
                  <input type="email" name="email" value={user.email}
                    onChange={(e) => setUser({ ...user, email: e.target.value })}
                    id="email" className="bg-gray-50 border border-gray-300  text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5  dark:border-gray-600 dark:placeholder-gray-400  dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="name@company.com" required />
                </div>
                <div>
                  <label htmlFor="password" className="block mb-2 text-sm font-medium  ">Password</label>
                  <input type="password" name="password"
                    value={user.password} onChange={(e) => setUser({ ...user, password: e.target.value })}
                    id="password" placeholder="••••••••" className="bg-gray-50 border border-gray-300  text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5  dark:border-gray-600 dark:placeholder-gray-400  dark:focus:ring-blue-500 dark:focus:border-blue-500" required />
                </div>
                <button type="submit" className="w-full text-white bg-blue-400 hover:bg-blue-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800" onClick={onLogin}>{buttonDisabled ? "No Sign In" : "Sign In"}</button>
                <p className="text-sm font-light ">
                  Don't have an account? <a href="/signup" className="font-medium text-primary-600 hover:underline dark:text-primary-500">Sign up here</a>
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