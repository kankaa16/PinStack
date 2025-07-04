import express from 'express'
const router=express.Router()
import {newpins} from '../controller/pincontroller.js';
import { getsinglepin, createpin} from '../controller/pincontroller.js';
import { verifytoken } from '../utilities/middleware/verifytoken.js';

router.get("/",newpins);
router.get("/:id", getsinglepin);
router.post("/",verifytoken,createpin);

export default router;