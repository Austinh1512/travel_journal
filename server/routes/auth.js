const express = require("express");
const router = express.Router();
const User = require("../models/User");
const login = require("../utils/login");
const bcrypt = require("bcrypt");


router.post("/register", async (req, res) => {
    const { username, password } = req.body;

    if (!username || !password) {
       return res.status(400).json({ "error": "Username and password required" });
    }

    const userAlreadyExists = await User.findOne({ username });
    if (userAlreadyExists) {
        return res.status(409).json({ "error": "User already exists" })
    }

    const user = new User({ username, password });

    login(user, res);
})

router.post("/login", async (req, res) => {
    const { username, password } = req.body;

    if (!username || !password) {
        return res.status(400).json({ "error": "Username and password required" });
     }
    
     const user = await User.findOne({ username });
     if (!user) {
         return res.status(404).json({ "error": "Invalid credentials" });
     }

     const match = await bcrypt.compare(password, user.password);

     if (!match) {
        return res.status(401).json({ "error": "Invalid credentials" });
     }

     login(user, res);
})

module.exports = router;