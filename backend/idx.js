import express from 'express';
import cors from 'cors';
import userrouter from './routes/userroute.js';
import pinrouter from './routes/pinroute.js';
import commentrouter from './routes/commentroute.js'
import boardrouter from './routes/boardroute.js'
import connectdb from './utilities/connectdb.js';
import dotenv from 'dotenv';
import cookieParser from 'cookie-parser';
import fileupload from 'express-fileupload';

dotenv.config();
const app = express();
app.use(express.json());
app.use(cors({origin:process.env.clienturl, credentials:true}))
app.use(cookieParser());
app.use(fileupload());

app.use("/users", userrouter);

app.use("/pins",pinrouter );

app.use("/comments",commentrouter);

app.use("/boards",boardrouter);



app.listen(3000, () => {
  connectdb();
  console.log("server is running");
});
