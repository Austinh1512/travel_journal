const GoogleStrategy = require("passport-google-oauth20").Strategy;
const passport = require("passport");
const User = require("../models/User");
const jwt = require("jsonwebtoken");

passport.use(
  new GoogleStrategy(
    {
      clientID: process.env.OAUTH_CLIENT_ID,
      clientSecret: process.env.OAUTH_CLIENT_SECRET,
      callbackURL: "/api/auth/google/callback",
    },
    async (googleAccessToken, googleRefreshToken, profile, done) => {
      try {
        let user = await User.findOne({ googleID: profile.id });

        if (!user) {
          user = new User({
            username: profile.displayName,
            googleID: profile.id,
          });
        }

        const refreshToken = jwt.sign(
          {
            username: user.username,
            id: user._id,
          },
          process.env.JWT_REFRESH_TOKEN_SECRET,
          { expiresIn: "7d" }
        );
        user.refreshToken = refreshToken;
        await user.save();
        return done(null, { refreshToken });
      } catch (err) {
        console.error(err);
        return done(err, false);
      }
    }
  )
);
