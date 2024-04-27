"use client"
import React, { use, useEffect, useState } from 'react'
import axios from 'axios';
import {toast} from 'react-hot-toast';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

const LoginPage = () => {
    const router=useRouter();
    const [user, setuser] = useState({
        email:"",
        password:"",
    })
    const [buttonDisable,setbuttonDisable]=useState(true);
    const [loading,setloading]=useState(false);

    const onLogin=async()=>{
        try {
            setbuttonDisable(false)
            setloading(true);
            const res=await axios.post('/api/users/login',user);
            console.log("login success ",res.data);
            toast.success("Login Successfully");
            router.push('/profile');
            setbuttonDisable(true)
        } catch (error:any) {
            toast.error("error in login");
            setbuttonDisable(true)
            console.log("err in login:",error)
        }
    }
    useEffect(()=>{
        if(user.email.length>0 && user.password.length>0 ){
            setbuttonDisable(false);
        }
        else{
            setbuttonDisable(true);
        }
    },[user])
  return (
    <div className="flex flex-col items-center justify-center min-h-screen py-2">
        <h1>{loading? "Processing": "Sign In"}</h1>
        <hr />
        
        <label htmlFor="email">Email</label>
         <input
            className="p-2 border border-gray-300 rounded-lg mb-4 
            focus:outline-none focus:border-gray-600 text-black"
            type='email'
            value={user.email}
            onChange={(e)=>setuser({...user,email:e.target.value})}
            placeholder='Email'
        />
        <label htmlFor="password" className=''>Password</label>
         <input
            className="p-2 border border-gray-300 rounded-lg mb-4 
            focus:outline-none focus:border-gray-600 text-black"
            type='password'
            value={user.password}
            onChange={(e)=>setuser({...user,password:e.target.value})}
            placeholder='Password'

        />
        <button onClick={onLogin}
         className="p-2 border border-gray-300 rounded-lg mb-4 
         focus:outline-none focus:border-gray-600"
        >
            {buttonDisable?"No sign In":"Sign In"}
        </button>
        <Link href={'/signup'}>
            visit signup Page
        </Link>
    </div>
  )
}

export default LoginPage