const express = require("express");
const router = express.Router();
const userController = require("../controllers/users.controller");
const authenticate = require("../middleware/authenticate.middleware");

router.post("/api/users", userController.createUser);
router.get("/api/users", authenticate, userController.getUser);
router.get("/api/users/:username", authenticate, userController.getUserDetails);
router.put(
  "/api/users/:username",
  authenticate,
  userController.updateUserDetails
);
router.delete(
  "/api/users/:username",
  authenticate,
  userController.deleteUserByUsername
);
router.post("/api/user/login", userController.userLogin);

module.exports = router;
