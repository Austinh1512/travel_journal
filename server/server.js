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

//Connect to Mongo
 connectDB();

//Middleware
app.use(cors(corsOptions));
app.use(express.json());
app.use(cookieParser());
app.use(passport.initialize());

//Passport jwt strategy
require("./config/passport-jwt");

//Route Handlers
const entryRouter = require("./routes/entries");
app.use("/api/entries", entryRouter);

app.use((err, req, res, next) => {
    res.status(500).send(err.message);
})

app.listen(5000, () => { console.log("Server running...") });

