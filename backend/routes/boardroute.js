import express from 'express'
const router=express.Router()

import {collections} from '../controller/boardcontoller.js';

router.get("/:userid",collections);

export default router;