if (process.env.NODE_ENV !== "production") {
    require("dotenv").config();
}

const express = require("express");
const app = express();
const cors = require("cors");
const corsOptions = require("./config/corsOptions");
const cookieParser = require("cookie-parser");
const connectDB = require("./config/connect-db");
const passport = require("passport");
const setHeaders = require("./middleware/setHeaders");

//Connect to Mongo
 connectDB();

//Middleware
app.use(setHeaders);
app.use(cors(corsOptions));
app.use(express.json());
app.use(cookieParser());
app.use(passport.initialize());

//Passport jwt strategy
require("./config/passport-jwt");

//Route Handlers
const entryRouter = require("./routes/entries");
app.use("/api/entries", entryRouter);

const authRouter = require("./routes/auth");
app.use("/api/auth", authRouter);

app.use("*", (req, res) => {
    res.status(404).json({ "error": "Page does not exist" })
})

app.use((err, req, res, next) => {
    res.status(500).json({ "error": err.message });
})

app.listen(5000, () => { console.log("Server running...") });

