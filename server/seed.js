const mongoose = require("mongoose");
const JournalEntry = require("./models/journalEntry");

mongoose.connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true
});
const db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error:"));
db.once("open", () => {
    console.log("Database connected!");
});
mongoose.set('strictQuery', false);

const seeds = [
    {
        place: "Mount Fuji",
        country: "Japan",
        startDate: "2021-01-12",
        endDate: "2021-01-24",
        description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
        thumbnail: "https://source.unsplash.com/WLxQvbMyfas"
    },

    {
        place: "Sydney Opera House",
        country: "Australia",
        startDate: "2021-01-12",
        endDate: "2021-01-24",
        description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
        thumbnail: "https://source.unsplash.com/JmuyB_LibRo"
    },

    {
        place: "Geirangerfjord",
        country: "Norway",
        startDate: "2021-01-12",
        endDate: "2021-01-24",
        description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
        thumbnail: "https://source.unsplash.com/3PeSjpLVtLg"
    }
]

const seedDB = async () => {
    await JournalEntry.deleteMany({});
    seeds.forEach(async (seed) => {
        await new JournalEntry(seed).save();
    })
}

seedDB();