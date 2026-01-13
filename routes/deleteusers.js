const express=require("express");
const router=express.Router();

const {delete_all_users,delete_required_user}=require("../controllers/DeleteUser");

// put post delete get
router.delete("/deleteOne",delete_required_user);

router.delete("/deleteAll",delete_all_users);

module.exports=router;