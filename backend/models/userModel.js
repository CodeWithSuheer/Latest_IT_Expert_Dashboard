import mongoose from "mongoose";

const schema = new mongoose.Schema({
    name:{
        type:String,
        required:[true,"Please provide a name"]
    },
    email:{
        type:String,
        required:[true,"Please provide a email"],
        unique:true,
    },
    password:{
        type:String,
        required:[true,"Please provide a password"],
    },
    isAuthenticated: { 
        type: Boolean,
        default: false 
    },
    superAdmin:{
        type : Boolean ,
        default : false
    }
});

export const User = mongoose.model("Admins", schema);