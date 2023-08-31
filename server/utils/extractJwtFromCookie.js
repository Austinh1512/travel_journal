const extractJwtFromCookie = (req) => {
  if (req && req.cookies) {
    return req.cookies["jwt"];
  }
};

module.exports = extractJwtFromCookie;
