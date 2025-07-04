import express from 'express'
const router=express.Router()

import {comments} from '../controller/commentcontroller.js';
import {addcomment} from '../controller/commentcontroller.js'
import { verifytoken } from '../utilities/middleware/verifytoken.js';
import {deleteComment} from '../controller/commentcontroller.js'
router.get("/:postid",comments)

router.post("/",verifytoken,addcomment);

router.delete('/:commentId', verifytoken, deleteComment);

export default router;