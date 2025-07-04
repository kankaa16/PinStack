import mongoose from "mongoose";
import { Schema } from "mongoose";

const pinschema= new Schema({
    
    pinimg:{
        type:String,
        required:true,
    },

    height:{
        type:Number,
        required:true,
    },

    width:{
        type:Number,
        required:true,
    },

    title:{
        type:String,
    },

    desc:{
        type:String,
    },

    link:{
        type:String,
    },

    board:{
        type:Schema.Types.ObjectId,
        ref:"board",
    },
    tag:{
        type:[String],
    },

    user:{
        type:Schema.Types.ObjectId,
        ref:"user",
        required:true,
    }


},{timestamps:true});

export default mongoose.model("pin",pinschema);