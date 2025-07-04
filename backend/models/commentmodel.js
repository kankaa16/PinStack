import mongoose from "mongoose";
import { Schema } from "mongoose";

const commentschema= new Schema({
    

    desc:{
        type:String,
    },


   pin:{
        type:Schema.Types.ObjectId,
        ref:"pin",
    },
    
    user:{
        type:Schema.Types.ObjectId,
        ref:"user",
        required:true,
    }


},{timestamps:true});

export default mongoose.model("comment",commentschema);