const express = require("express");
const router = express.Router();
const { getUserInfo, handleRegister, handleLogin, handleRefresh, handleLogout } = require("../controllers/auth");

router.post("/register", handleRegister);

router.post("/login", handleLogin);

router.get("/refresh", handleRefresh);

router.get("/logout", handleLogout);

router.get("/:id", getUserInfo);

module.exports = router;