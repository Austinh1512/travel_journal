const whitelistedOrigins = require("../config/whitelistedOrigins");

const setHeaders = (req, res, next) => {
    const origin = req.headers.origin;
    if (whitelistedOrigins.includes(origin)) {
        res.header('Access-Control-Allow-Origin', origin);
        res.header('Access-Control-Allow-Credentials', true);
    }
    next();
}

module.exports = setHeaders;