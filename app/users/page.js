import React from 'react'
import Link from 'next/link'

const Page = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen text-center">
      <p className="mb-4">Create an account or sign in if you already have one</p>
      <Link href="/profile" className="text-green-500">Return To Profile</Link>
    </div>
  )
}

export default Page
