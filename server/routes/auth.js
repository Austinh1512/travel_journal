const express = require("express");
const router = express.Router();
const { handleRegister, handleLogin, handleRefresh, handleLogout } = require("../controllers/auth");


router.post("/register", handleRegister);

router.post("/login", handleLogin);

router.get("/refresh", handleRefresh);

router.get("/logout", handleLogout);

module.exports = router;