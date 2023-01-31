const mongoose = require("mongoose");
const { Schema } = mongoose;

const journalEntrySchema = new Schema({
    place: String,
    startDate: String,
    endDate: String,
    country: String,
    description: String,
    thumbnail: String
})

module.exports = mongoose.model("JournalEntry", journalEntrySchema);