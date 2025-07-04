import mongoose from "mongoose";
import { Schema } from "mongoose";


const followschema= new Schema({
    follower:{
        type: Schema.Types.ObjectId,
        ref:'user',
        required:true,
    },
    following:{
        type: Schema.Types.ObjectId,
        ref:'user',
        required:true,
    }
}, {timestamps:true});

export default mongoose.model("follow",followschema);