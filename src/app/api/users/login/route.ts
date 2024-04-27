import { connectdb } from "@/dbconfig/dbConfig";
import User from '@/models/userModel'
import { NextRequest,NextResponse } from "next/server";
import bcryptjs from 'bcryptjs';
import jwt from "jsonwebtoken";

connectdb();

export async function POST(request:NextRequest) {
    try {
        const reqBody=await request.json();
        const {email,password}=reqBody;
        console.log(reqBody);

        const user=await User.findOne({email});

        if(!user){
            return NextResponse.json({
                message:"Plesae signup first"
            },{status:500})
        }
        console.log("User exist");
        if(!await bcryptjs.compare(password,user.password)){
            return NextResponse.json({
                message:"Password is not correct"
            },{status:400})
        }

        const payload={
            id:user._id,
            username:user.username,
            email:user.email
        }
        const token=await jwt.sign(payload,process.env.TOKEN_SECRET!,{expiresIn:'1d'})
        const response=NextResponse.json({
            message:"Logged In successfully",
            success:true
        })
        response.cookies.set("token",token,{
            httpOnly:true,
        })
        return response
    } catch (error:any) {
        return NextResponse.json({
            error:error.message
        },{status:400})
    }
}