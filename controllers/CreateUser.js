
const User = require("../models/User");
exports.createUser = async(req,res)=>{
 try {
   const {username,password,phone_number}=req.body;
  if(!username || !phone_number || !password)
    return res.status(400).json({
    msg:"all fields are require" 
  })

  // const isAlreadyexit= await User.findOne({ username });
  // if(isAlreadyexit){
  //   return res.status(400).json({
  //     msg:"User Already exist"
  //   })
  // }

  const newUser= new User({username,password,phone_number});
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