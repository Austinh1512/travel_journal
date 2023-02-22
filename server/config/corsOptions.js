const whitelistedOrigins = require("./whitelistedOrigins");

const corsOptions = {
    origin: whitelistedOrigins,
    credentials: true,
    optionsSuccessStatus: 200
}

module.exports = corsOptions;