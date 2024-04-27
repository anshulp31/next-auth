import { connectdb } from "@/dbconfig/dbConfig";
import User from '@/models/userModel'
import { NextRequest,NextResponse } from "next/server";
import bcryptjs from 'bcryptjs'
import {sentMail} from '@/helpers/mailer'

connectdb();

export async function POST(request:NextRequest) {
    try {
        const reqBody=await request.json();
        const {username,email,password}=reqBody;

        //validation
        const user=await User.findOne({email});
        if(user){
            return NextResponse.json({error:"userAlready Exist"},{status:400})
        }
        const salt=await bcryptjs.genSalt(10);

        const encypPass=await bcryptjs.hash(password,salt);

        const newUser= new User({
            username,email,password:encypPass
        })
        const savedUser=await newUser.save();

        //send verification email
        await sentMail({email,emailType:"VERIFY",userId:savedUser._id});

        return NextResponse.json(
        {
            message:"user registered successfully",
            savedUser,
            success:true
        }
        )

    } catch (error:any) {
        console.log("error in signup")
        return NextResponse.json({error:error.message},{status:500});
    }
}

