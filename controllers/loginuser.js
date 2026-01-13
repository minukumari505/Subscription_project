const User=require("../models/User"); //to get information of user
const bcrypt=require('bcrypt');// Library used for Hashing or Comparing password
exports.Userlogin=async(req , res)=>{
  try{
     const{username,password}=req.body;
     const isUserExist=await User.findOne({username});
     if(!isUserExist){
        return res.status(400).json({
            msg:"User doesn't exist"
        })
     }
     const isMatchPassword=await bcrypt.compare(password,isUserExist.password) ;
     if(!isMatchPassword){
        return res.status(400).json({
            msg:"Invalid Credential"
        })
     }
     return res.status(200).json({
        msg:"Logged in",
        user:isUserExist
     })
  }
  catch(error){
        return res.status(400).json({
            msg:error.message
        })
  }
}
