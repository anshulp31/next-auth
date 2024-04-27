import { connectdb } from "@/dbconfig/dbConfig";
import User from '@/models/userModel'
import { NextRequest,NextResponse } from "next/server";

import { getDataFromToken } from "@/helpers/getDataFromToken";

connectdb();

export async function POST(request:NextRequest) {
    try {
        const userId=getDataFromToken(request);
        const user=await User.findOne({_id:userId}).select("-password");
        return NextResponse.json({
            message:"User Found",
            data:user
        })

    } catch (error:any) {
        throw new Error(error.message)
    }

}