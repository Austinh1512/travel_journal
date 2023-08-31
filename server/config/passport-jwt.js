const passport = require("passport");
const JwtStrategy = require("passport-jwt").Strategy;
const ExtractJwt = require("passport-jwt").ExtractJwt;
const User = require("../models/User");

const options = {
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
  secretOrKey: process.env.JWT_ACCESS_TOKEN_SECRET,
};

passport.use(
  new JwtStrategy(options, (jwt_payload, done) => {
    User.findOne({ username: jwt_payload.username }, (err, user) => {
      if (err) {
        console.log(err);
        return done(err, false);
      }

      if (user) {
        return done(null, user);
      }
    });
  })
);
