'use client'
import axios from 'axios'
import { cookies } from 'next/headers'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import React, { useState } from 'react'
import toast from 'react-hot-toast'

const page = () => {
  const router=useRouter();
  const [data, setData] = useState("nothing");
  const logout=async()=>{
    try {
      await axios.get('/api/users/logout');
      toast.success('Logged out');
      router.push('/login');

    } catch (error:any) {
      toast.error(error.message)
    }
  }
  const getUserDetails=async()=>{
    try {
      const res=await axios.post('/api/users/me');
      console.log(res);
      setData(res.data.data._id);
    } catch (error:any) {
      toast.error(error.message)
    }
  }

  return (
    <div className="flex flex-col items-center justify-center min-h-screen py-2">
      <h1 className="text-4xl">Profile Page</h1>

      <h1>
        {data == "nothing" ? (
          "nothing"
        ) : (
          <Link href={`/profile/${data}`}>{data}</Link>
        )}
      </h1>
      <button
        className="p-2 border border-blue-300 bg-blue-600 mt-3 rounded-lg mb-4 
         focus:outline-none focus:border-gray-600"
        onClick={logout}
      >
        Logout
      </button>
      <button
        className="p-2 border border-blue-300 bg-green-600 mt-3 rounded-lg mb-4 
         focus:outline-none focus:border-gray-600"
        onClick={getUserDetails}
      >
        Get User Details
      </button>
    </div>
  );
}

export default page