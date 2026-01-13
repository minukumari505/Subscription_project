
const User = require("../models/User");
// use of bcrypt library for password hashing 
const bcrypt=require('bcrypt');
exports.createUser = async(req,res)=>{
 try {
   const {username,password,phone_number}=req.body;
  if(!username || !phone_number || !password)
    return res.status(400).json({
    msg:"all fields are require" 
  })
  
  const isAlreadyexit= await User.findOne({ username });
  if(isAlreadyexit){
    return res.status(400).json({
      msg:"User Already exist"
    })
  }
//  we need to store the hashed passwpord in the db 
const round=10;
const hashedpassword=await bcrypt.hash(password,round);
  const newUser= new User({
    username:username,
    password:hashedpassword,
    phone_number:phone_number});
  await newUser.save();

  return res.status(200).json({
    msg:"user created sucessfully"
  })
 }
 catch(error){
  return res.status(400).json({
    msg:error.message
  }) 
 }
}