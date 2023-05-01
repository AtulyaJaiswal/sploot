const express = require("express");
const { 
     registerUser, 
     loginUser, 
     logout,
     updateUser
} = require("../controllers/userController");
const { isAuthenticatedUser } = require("../middleware/auth");
const router = express.Router();

router.route("/signup").post(registerUser);
router.route("/login").post(loginUser);
router.route("/users/:id").put(isAuthenticatedUser, updateUser);
router.route("/logout").get(logout);

module.exports = router;