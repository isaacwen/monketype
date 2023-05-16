const express = require("express");

const UserCtrl = require("../controllers/user-ctrl");

const router = express.Router();

router.post("/user", UserCtrl.createUser);
router.get("/verify", UserCtrl.verifyUser);
router.put("/user", UserCtrl.updateUser);
router.get("/user", UserCtrl.getUser);

module.exports = router;