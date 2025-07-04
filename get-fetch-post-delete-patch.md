router.get("/fetch",async(req,res)=>{
    const finduser= await usermodel.find({username:"test1"});
    res.json(finduser);
})

//for updating existing values, use patch!

router.patch("/update",async(req,res)=>{
    const updateddetails=await usermodel.updateOne({username:"test1"},req.body)
    res.json(updateddetails);
});

router.delete("/delete",async(req,res)=>{
    const deleteuser=await usermodel.deleteOne({name:"testuser"});
    res.json(deleteuser);
})
