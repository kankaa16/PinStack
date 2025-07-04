import usermodel from "../models/usermodel.js";
import pinmodel from "../models/pinmodel.js";
import boardmodel from "../models/boardmodel.js";
import commentmodel from "../models/commentmodel.js";
import bcrypt from 'bcryptjs';
import connectdb from "./connectdb.js";
import dotenv from 'dotenv';
dotenv.config();

const seeddb=async()=>{
    await connectdb();
    await usermodel.deleteMany({});
    await pinmodel.deleteMany({});
    await commentmodel.deleteMany({});
    await boardmodel.deleteMany({});

//creating new users, and pushing into an array of users[]

    const users=[];
    for(let i=1;i<=10;i++){
        const hashedpassword=await bcrypt.hash("pswd16",10);
        const user=new usermodel({
            name:`User ${i}`,
            username:`@${i}`,
            email:`user${i}@example.com`,
            hashedpswd:hashedpassword,
            img:`https://picsum.photos/id/${i}/200/200`,

        });
        users.push(await user.save());
    }

    const boards=[];
    for(const user of users){
        for(let i=1;i<=10;i++){
            const board=new boardmodel({
                title:`Board ${i} of ${user.username}`,
                user:user._id,
            });
            boards.push(await board.save());
        }
    }

    const pins=[];
    for(const user of users){
        const userboards=boards.filter((board)=>
            board.user.toString()==user._id.toString()
        );
        for(let i=1;i<=10;i++){
            const mediasize=Math.random()<0.5?"800/1200":"800/600";
            const pin=new pinmodel({
    pinimg:`https://picsum.photos/id/${i+10}/${mediasize}`,

    height: mediasize==="800/1200"?1200:600,

    width: 800,

    title: ` pin ${i} by ${user.username}`,

    desc: ` hello from ${user.username}!!!`,

    link:`https://example.com/pins${i}`,

    board:userboards[i-1]._id,

    tag:[`tag${i}`,"sample",user.username],

    user:user._id,
    });
    pins.push(await pin.save());
}}

for(const user of users){
    for(let i=1;i<=10;i++){
        const randompin=pins[Math.floor(Math.random()*pins.length)];
        const comment=new commentmodel({
            desc:`comment ${i} by ${user.username} :  this is a great pin!`,
            pin:randompin._id,
            user:user._id,
        });
        await comment.save();
    }
}

console.log("db seeded successfully");
process.exit(0);

};

seeddb().catch((error) => {
  console.error("Error seeding database:", error);
  process.exit(1);
});