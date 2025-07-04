import usermodel from '../models/usermodel.js';
import followmodel from '../models/followers.js'
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';


export const register=async(req,res)=>{
    const {uname,name,pswd,email}=req.body;
    if(!pswd || !uname || !name || !email)
        return res.json({message:"All fields are required!"})

    const newhashedpswd= await bcrypt.hash(pswd,10);

    const newuser=await usermodel.create({
        username:uname,
        name:name,
        email:email,
        hashedpswd:newhashedpswd,
    });

//userid is used in commentcontroller n verifytoken for verifying loggedin user

const token= jwt.sign({userid: newuser._id}, process.env.JWT_SECRET)
   res.cookie("token", token, {
    httpOnly:true,
    secure: process.env.NODE_ENV==="production",
    maxage:30*24*60*60*1000,
   })

    const{hashedpswd,...detailswithoutpswd}= newuser.toObject();
    res.status(201).json(detailswithoutpswd);

};

export const login=async(req,res)=>{
const {uname,pswd}=req.body;
    if(!pswd || !uname)
        return res.json({message:"All fields are required!"})


    const validuser=await usermodel.findOne({username:uname});
    if(!validuser){
        return res.json({message:"Invalid username or Password!"})

    }
    const ispswdright=await bcrypt.compare(pswd,validuser.hashedpswd)

    if(!ispswdright) 
    return res.json({message:"Invalid Password!"})

   const token= jwt.sign({userid:validuser._id}, process.env.JWT_SECRET)
   res.cookie("token", token, {
    httpOnly:true,
    secure: process.env.NODE_ENV==="production",
    maxage:30*24*60*60*1000,
   })


    const{hashedpswd,...detailswithoutpswd}=validuser.toObject();
    res.status(201).json(detailswithoutpswd);
};


export const logout=async(req,res)=>{
    res.clearCookie("token");
    res.status(200).json({message:"Logout Successful!"});
};



export const getuser=async(req,res)=>{
    const {username}=req.params;
    const user=await usermodel.findOne({username});
    const{hashedpswd, ...withoutpswd}=user.toObject();

    
    const followercount= await followmodel.countDocuments({following:user._id});
    const followingcount= await followmodel.countDocuments({follower:user._id});

    const token=req.cookies.token;
    
        if (!token) {
   return res.status(200).json({
      withoutpswd,
      followercount,
      followingcount,
      isfollowing: false,
    });
  } 
        try {
    const payload = jwt.verify(token, process.env.JWT_SECRET);
    const isexists = await followmodel.exists({
      follower: payload.userid,
      following: user._id,
    });

    return res.status(200).json({
      withoutpswd,
      followercount,
      followingcount,
      isfollowing: !!isexists,
    });
  } catch (err) {
    return res.status(200).json({
      withoutpswd,
      followercount,
      followingcount,
      isfollowing: false,
    });
  }
};
           




export const follow=async(req,res)=>{
    const {username} =req.params;
    const user=await usermodel.findOne({username});
    
    const isfollowing= await followmodel.exists({
        follower:req.userid,
        following:user._id,
    });

    
    if(isfollowing){
        await followmodel.deleteOne({
        follower:req.userid,
        following:user._id,
        })
    }
    else{
       await followmodel.create({
        follower:req.userid,
        following:user._id,
       }) 
    }
return res.json({ message: isfollowing ? "Unfollowed" : "Followed" });
}