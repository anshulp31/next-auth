import mongoose from "mongoose";

export async function connectdb() {
    try {
        mongoose.connect(process.env.MONGODB_URL!)
        const connection=mongoose.connection
        connection.on('connected',()=>{
            console.log("Mongodb Connected");
        })
        connection.on("error",(error)=>{
            console.log(error, " wrong in connecting to db" )
            process.exit();
        })
    } catch (error) {
        console.log("Something went wrong in connecting to db" ,error);
    }
}