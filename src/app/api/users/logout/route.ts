import { connectdb } from "@/dbconfig/dbConfig";
import { NextRequest,NextResponse } from "next/server";

connectdb();

export async function GET(request:NextRequest) {
        try {
            
            const response=NextResponse.json({
                message:"loggedOut Successfully",
                success:true
            })
            console.log(response)
            response.cookies.set("token","",{
                httpOnly:true,
                expires:new Date(0)
            })
            console.log("logging out");
            return response;

        } catch (error:any) {
            return NextResponse.json({
                error:error.message
            },{status:400})
        }
}