const express = require("express");
const router = express.Router();
const handleAsync = require("express-async-handler");
const {
  getUserInfo,
  handleRegister,
  handleLogin,
  handleRefresh,
  handleLogout,
} = require("../controllers/auth");
const validateUserSchema = require("../middleware/validateUserSchema");

router.post("/register", validateUserSchema, handleAsync(handleRegister));

router.post("/login", validateUserSchema, handleAsync(handleLogin));

router.get("/refresh", handleAsync(handleRefresh));

router.get("/logout", handleAsync(handleLogout));

router.get("/:id", handleAsync(getUserInfo));

module.exports = router;
