const User=require("../models/User");

exports.GetalluserDetails=async(req,res)=>{
    try{
        const allUser=await User.find();
        // allUser is empty  then send a response that there is no user 

        if(!allUser || allUser.length==0){
            return res.status(400).json({
                msg:"no user exist"
            })
        }
        
        return res.status(200).json({
            msg:"data of all users",
            alluser:allUser

        })
    }
    catch(error){
        return res.status(400).json({
            msg:error.message
        })
    }
}