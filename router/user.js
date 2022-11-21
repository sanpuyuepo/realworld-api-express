const express = require("express");
const userCtrl = require("../controller/user");
const userValidator = require("../validator/user");
const auth = require("../middleware/auth");

const router = express.Router();

// Authentication
router.post("/users/login", userValidator.login, userCtrl.login);

// Registration
router.post("/users", userValidator.register, userCtrl.register);

// Get current user
router.get("/user", auth, userCtrl.getCurrUser);

// Update user
router.put("/user", auth, userCtrl.updateUser);

module.exports = router;
