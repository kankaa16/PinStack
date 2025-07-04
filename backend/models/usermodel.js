import mongoose from "mongoose";
import { Schema } from "mongoose";

const userschema=new Schema({

    name:{
        type:String,
        required:true
    },
    username:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true
    },
    img:{
        type:String
    },
    hashedpswd:{
        required:true,
        type:String,
    },
},{timestamps:true}); 

export default mongoose.model("user",userschema);
