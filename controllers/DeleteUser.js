const User=require("../models/User");

exports.delete_required_user=async(req,res)=>{
      try{
       const {username}=req.body;
    //    username 
     
    const olduser=await User.findOne({username});
    if(!olduser){
         return res.status(400).json({
        msg:"user not exist "
       })
    }

    //  _id,username,password,phone_number

       await User.deleteOne({_id:olduser._id});

       return res.status(200).json({
        msg:"user deleted successfully ",
        deleteduser: olduser 
       })
      }catch(error){
        return res.status(400).json({
            msg:error.message
        })
      }
}



exports.delete_all_users=async(req,res)=>{
    try{
    // is any user exist 
        await User.deleteMany({});
         
        return res.status(200).json({
        msg:"all users deleted successfully "
       })

      }catch(error){
        return res.status(400).json({
            msg:error.message
        })
      }
}