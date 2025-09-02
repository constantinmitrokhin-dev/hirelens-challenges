
const { Router } = require("express");
const router = Router();
const { createNewUser, loginUser } = require("../../controllers/user-controller.js");
const { checkUserExists, checkMinimalPasswordLength } = require("../../middleware/user-middleware.js");

//* User
// Create new Account
router.post("/register", checkUserExists, checkMinimalPasswordLength, createNewUser );
// Login
router.post("/login", loginUser );

module.exports = router;