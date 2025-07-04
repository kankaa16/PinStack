import jwt from 'jsonwebtoken'

export const verifytoken=(req,res,next)=>{
       
    const token=req.cookies.token;

       if(!token) 
    return res.json({message:"User not verified!"});
       
       jwt.verify(token, process.env.JWT_SECRET, (err, payload)=>{
          if(err) 
            return res.json("Token is invalid!");
          
          req.userid=payload.userid;
          
          next();
});

};