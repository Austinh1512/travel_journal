const mongoose = require("mongoose");
const { Schema } = mongoose;

const journalEntrySchema = new Schema({
  place: String,
  startDate: String,
  endDate: String,
  country: String,
  description: String,
  images: [
    {
      url: String,
      filename: String,
    },
  ],
  user: {
    type: Schema.Types.ObjectId,
    ref: "User",
  },
});

module.exports = mongoose.model("JournalEntry", journalEntrySchema);
