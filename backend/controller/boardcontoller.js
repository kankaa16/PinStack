import boardmodel from "../models/boardmodel.js";
import pinmodel from "../models/pinmodel.js";


export const collections= async(req,res)=>{

    const {userid}=req.params;
    const board=await boardmodel.find({user:userid});
    const pindetails=await Promise.all(board.map(async(board)=>{

        const pincount=await pinmodel.countDocuments({board:board._id});
        const firstpin=await pinmodel.findOne({board:board._id});
        return {
            ...board.toObject(),
            pincount,
            firstpin,
        }
    })
);
res.json(pindetails);
};