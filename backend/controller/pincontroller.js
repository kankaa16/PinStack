import { response } from "express";
import pinmodel from "../models/pinmodel.js";
import usermodel from "../models/usermodel.js";
import Imagekit from "imagekit"
export const newpins=async(req,res)=>{
    const pageno=Number(req.query.cursor) || 0;
    const search=req.query.search || "";
    const imgperpage=20;
    const userid=req.query.userid;
    const boardid=req.query.boardid;

    const pins=await pinmodel.find(
       search? {
            $or:[
                {title: {$regex:search, $options:'i'}},
                {tag: {$in:[search]}}
            ]
        } : userid ?{user:userid}:boardid?{board:boardid}:{}
    ).limit(imgperpage).skip(imgperpage*pageno);

    // after 1st pg, this property skips 1*20 ImageTrackList, and displays the next 20 images!
    
    
    const hasNextpg=pins.length===imgperpage;
    await new Promise(resolve=>setTimeout(resolve,2500));
    res.status(200).json({pins,
        nextCursor:(hasNextpg?pageno+1:null)});
}


export const getsinglepin=async(req,res)=>{
    const {id}=req.params;
    const pin=await pinmodel.findById(id).populate("user","username img name");
    res.json(pin);
}

export const createpin=async(req,res)=>{
    const {title,desc,link,board,tag}=req.body;
    const media= req.files.imgfile;

    if(!title||!desc|| !media)
        return res.status(400).json({message:"All fields are required!"});

    const imgkit= new Imagekit({
        publicKey: process.env.publicKey ,
        privateKey: process.env.privateKey ,
        urlEndpoint: process.env.urlEndpoint,
    });

    console.log("ImageKit keys:", process.env.publicKey, process.env.privateKey, process.env.urlEndpoint);
    const transformation= `w-500, h-500`;

    try {
    const response = await imgkit.upload({
        file: media.data,
        fileName: media.name,
        folder: "test",
        // optional: transformation: { pre: "w-800,h-600" }
    });

    res.json({response});

} catch (error) {
    console.error("Upload or DB Error:", error);
    res.status(500).json({ message: "Something went wrong", error: error.message });
}

}