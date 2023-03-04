const jwt = require("jsonwebtoken");

const login = async (user, res) => {
    const accessToken = jwt.sign({
        "username": user.username,
        "id": user._id
    }, process.env.JWT_ACCESS_TOKEN_SECRET, { "expiresIn": "30s" });

    const refreshToken = jwt.sign({
        "username": user.username,
        "id": user._id
    }, process.env.JWT_REFRESH_TOKEN_SECRET, { "expiresIn": "7d" });

    user.refreshToken = refreshToken;
    await user.save();

    res.cookie("jwt", refreshToken, { httpOnly: true, secure: true, sameSite: "None", maxAge: 1000 * 60 * 60 * 24 * 7 }); //1 week

    res.status(201).json({ "username": user.username, "userID": user._id, accessToken });
}

module.exports = login;