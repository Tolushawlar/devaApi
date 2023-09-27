const express = require("express");
const router = express.Router();
const userController = require("../controllers/users.controller");

router.get("/api/users", userController.getUser);
router.post("/api/users", userController.createUser);
router.get("/api/users/:username", userController.getUserDetails);
router.put("/api/users/:username", userController.updateUserDetails);
router.delete("/api/users/:username", userController.deleteUserByUsername);
router.post("/api/user/login", userController.userLogin);

module.exports = router;
