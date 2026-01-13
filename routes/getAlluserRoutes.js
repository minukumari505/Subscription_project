const express=require("express");
const{GetalluserDetails}=require("../controllers/Getuser");
const router=express.Router();

router.get('/getallusers',GetalluserDetails);
module.exports=router;
