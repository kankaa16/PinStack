import commentmodel from "../models/commentmodel.js";
import usermodel from "../models/usermodel.js";
import jwt from 'jsonwebtoken';

export const comments= async(req,res)=>{
   const {postid}=req.params;
//createdat=-1 so that we can see the latest comments first!
   const comments=await commentmodel.find({pin:postid}).populate("user" , "username img name").sort({createdAt:-1});
   res.json(comments);
}

export const addcomment= async(req,res)=>{
   const {desc, pin}= req.body;
   const userid=req.userid;

   const comment=await commentmodel.create({
      desc:desc,
      pin:pin,
      user:userid
   })
   res.json(comment);


}

export const deleteComment = async (req, res) => {
  const { commentId } = req.params;
  const userid = req.userid; // 
  // From verifytoken middleware
  // Optional: Check if the user is the author of the comment
  const comment = await commentmodel.findById(commentId);
  if (!comment) return res.status(404).json({ message: "Comment not found" });
  if (comment.user.toString() !== userid) return res.status(403).json({ message: "Not authorized" });
  await commentmodel.findByIdAndDelete(commentId);
  res.json({ message: 'Comment deleted' });
};