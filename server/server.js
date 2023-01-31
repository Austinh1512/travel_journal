if (process.env.NODE_ENV !== "production") {
    require("dotenv").config();
}

const express = require("express");
const app = express();
const mongoose = require("mongoose");
const JournalEntry = require("./models/journalEntry");
const cors = require("cors");

//Connect to Mongo
mongoose.connect(`mongodb+srv://${process.env.MONGO_USER_NAME}:${process.env.MONGO_PASSWORD}@cluster0.hzrmebg.mongodb.net/?retryWrites=true&w=majority`, {
    useNewUrlParser: true,
    useUnifiedTopology: true
});
const db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error:"));
db.once("open", () => {
    console.log("Database connected!");
});
mongoose.set('strictQuery', false); 

//Middleware
app.use(cors());
app.use(express.json())

//Route Handlers
const entryRouter = require("./routes/entries");
app.use("/api/entries", entryRouter);

app.listen(5000, () => { console.log("Server running...") });

