
// const express = require("express");
// const {createUser} = require("../controllers/CreateUser");
// const router= express.Router();

// router.post("/signup",createUser);
// module.exports=router;

const express=require("express");
const {Userlogin}= require("../controllers/loginuser");
const router= express.Router();

router.post("/llogin",Userlogin);
module.exports=router;

