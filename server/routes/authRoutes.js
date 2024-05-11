const express = require("express");
const {
  registerController,
  loginController,
  currentUserController,
} = require("../controllers/authController");
const authMiddlware = require("../middleware/authMiddlware");
//router object
const router = express.Router();

//routes
router.post("/register", registerController);

router.post("/login", loginController);

//get current user
router.get("/current-user", authMiddlware, currentUserController);
module.exports = router;
