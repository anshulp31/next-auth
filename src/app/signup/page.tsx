"use client"
import React, { use, useEffect, useState } from 'react'
import axios from 'axios';
import {toast} from 'react-hot-toast';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

const SignupPage = () => {
    const router=useRouter();
    const [user, setuser] = useState({
        email:"",
        password:"",
        username:""
    })
    const [buttonDisable,setbuttonDisable]=useState(true);
    const [loading,setloading]=useState(false);

    const onSignup=async()=>{
        try {
            setbuttonDisable(false)
            setloading(true);
            const res=await axios.post('/api/users/signup',user);
            console.log("signup success ",res.data);
            toast.success("signup");
            router.push('/login');
            setbuttonDisable(true)
        } catch (error:any) {
            toast.error("error in Signup");
            setbuttonDisable(true)
            console.log("err in signup:",error)
        }
    }
    useEffect(()=>{
        if(user.email.length>0 && user.password.length>0 && user.username.length>0){
            setbuttonDisable(false);
        }
        else{
            setbuttonDisable(true);
        }
    },[user])
  return (
    <div className="flex flex-col items-center justify-center min-h-screen py-2">
        <h1>{loading? "Processing": "SignUp"}</h1>
        <hr />
        <label htmlFor="username">username</label>
        <input
            className="p-2 border border-gray-300 rounded-lg mb-4 
            focus:outline-none focus:border-gray-600 text-black"
            type='text'
            value={user.username}
            onChange={(e)=>setuser({...user,username:e.target.value})}
            placeholder='username'
        />
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
        <button onClick={onSignup}
         className="p-2 border border-gray-300 rounded-lg mb-4 
         focus:outline-none focus:border-gray-600"
        >
            {buttonDisable?"No sign Up":"Sign Up"}
        </button>
        <Link href={'/login'}>
            visit login Page
        </Link>
    </div>
  )
}

export default SignupPage