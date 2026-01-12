// const express = require("express");
// const router = express.Router();
// const upload = require("../middlewares/upload");
// const {createUser} = require("../controllers/CreateUser");

// router.post("/subscribe", upload.single("photo"), createUser);

// module.exports = router;

const express = require("express");
const {createUser} = require("../controllers/CreateUser");
const router= express.Router();

router.post("/signup",createUser);
module.exports=router;