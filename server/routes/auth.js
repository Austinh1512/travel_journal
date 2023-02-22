const express = require("express");
const router = express.Router();
const User = require("../models/User");
const login = require("../utils/login");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const extractJwtFromCookie = require("../utils/extractJwtFromCookie");

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
    await user.save();

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
        return res.status(405).json({ "error": "Invalid credentials" });
     }

     login(user, res);
})

router.get("/refresh", async (req, res) => {
    const token = extractJwtFromCookie(req);

    if (!token) {
        return res.status(401).json({ "error": "missing required credentials" });
    }

    const user = await User.findOne({ refreshToken: token });

    if (!user) {
        return res.status(403).json({ "error": "invalid token" });
    }

    jwt.verify(token, process.env.JWT_REFRESH_TOKEN_SECRET, (err, decoded) => {
        if (err || user.username !== decoded.username) {
            return res.status(403).json({ "error": "invalid token" });
        }

        const accessToken = jwt.sign({
            "username": user.username,
            "id": user._id
        }, process.env.JWT_ACCESS_TOKEN_SECRET, { "expiresIn": "30s" });

        res.status(200).json({ "username": user.username, accessToken });
    })
})

router.get("/logout", (req, res) => {
    res.clearCookie("jwt", { httpOnly: true, secure: true, sameSite: "None" });
    res.sendStatus(200);
})

module.exports = router;