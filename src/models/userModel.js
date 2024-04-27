import mongoose  from "mongoose";

const userSchema=new mongoose.Schema({
    username:{
        type:String,
        required:[true,"please Provide Username"],
    },
    email:{
        type:String,
        required:[true,"please Provide email"],
        unique:true
    },
    password:{
        type:String,
        required:[true,"please Provide Psseord"],
    },
    isVerified:{
        type:Boolean,
        default:false
    },
    isAdmin:{
        type:Boolean,
        default:false
    },
    forgotPasswordToken:String,
    forgotPasswordTokenExpiry:Date,
    verifyToken:String,
    verifyTokenExpiry:Date
})

const User=mongoose.model.users || mongoose.model("users",userSchema);
export default User