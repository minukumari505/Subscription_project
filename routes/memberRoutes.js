const router = require("express").Router();
const controller = require("../controllers/memberController");

router.post("/create", controller.createMember);
router.post("/login", controller.login);
router.delete("/delete/:id", controller.deleteMember);
router.put("/update/membership/:id", controller.updateMembership);
router.put("/update/training/:id", controller.updateTraining);
router.put("/update/mobile/:id", controller.updateMobile);
router.put("/update/email/:id", controller.updateEmail);
router.put("/update/dp/:id", controller.updateDP);

module.exports = router;

//endpoints or api are not case-sensative