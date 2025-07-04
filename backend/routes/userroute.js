import express from 'express'
const router=express.Router()
import {getuser} from '../controller/usercontroller.js';
import {register} from '../controller/usercontroller.js';
import {login} from '../controller/usercontroller.js';
import {logout} from '../controller/usercontroller.js';
import { follow } from '../controller/usercontroller.js';

import usermodel from '../models/usermodel.js';
import bcrypt from 'bcryptjs';
import { verifytoken } from '../utilities/middleware/verifytoken.js';

// router.post("/create",async(req,res)=>{
//     const userinfo=req.body;
//     const hashedpassword= await bcrypt.hash(req.body.hashedpswd,10)
//     console.log(userinfo);
//     const newuser= await usermodel.create({
//         name:req.body.name,
//         username:req.body.username,
//         email:req.body.email,
//         hashedpswd: hashedpassword,
//     });
//     res.json({ message: "User info received", data: newuser });
// })


router.get("/:username",getuser);
router.post("/auth/register",register);
router.post("/auth/login",login);
router.post("/auth/logout",logout);
router.post("/follow/:username",verifytoken, follow);

export default router;