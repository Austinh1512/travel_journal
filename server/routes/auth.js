const express = require("express");
const router = express.Router();
const handleAsync = require("express-async-handler");
const { getUserInfo, handleRegister, handleLogin, handleRefresh, handleLogout } = require("../controllers/auth");

router.post("/register", handleAsync(handleRegister));

router.post("/login", handleAsync(handleLogin));

router.get("/refresh", handleAsync(handleRefresh));

router.get("/logout", handleAsync(handleLogout));

router.get("/:id", handleAsync(getUserInfo));

module.exports = router;