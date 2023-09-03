const express = require("express");
const passport = require("passport");
const router = express.Router();

const CLIENT_URL =
  process.env.NODE_ENV === "development"
    ? "http://localhost:5173"
    : "https://travel-journal-hdk8.onrender.com";

router.get(
  "/",
  passport.authenticate("google", { scope: ["profile", "email"] })
);

router.get(
  "/callback",
  passport.authenticate("google", {
    session: false,
    failureMessage: "Login failed",
    failureRedirect: CLIENT_URL + "/login",
  }),
  (req, res) => {
    const { refreshToken } = req.user;
    res.cookie("jwt", refreshToken, {
      httpOnly: false,
      secure: true,
      sameSite: "None",
      maxAge: 1000 * 60 * 60 * 24 * 7,
    });
    res.redirect(CLIENT_URL);
  }
);

module.exports = router;
