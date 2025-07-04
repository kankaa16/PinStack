import mongoose from "mongoose";
import { Schema } from "mongoose";

const boardschema= new Schema({

    title:{
        type:String,
    },

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

export default mongoose.model("board",boardschema);