const mongoose = require("mongoose");
const { Schema } = mongoose;

const userSchema = new Schema({
    username: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true,
    },
    refreshToken: {
        type: String,
        default: ""
    },
    journal_entries: [
        {
            type: Schema.Types.ObjectId,
            ref: "JournalEntry"
        }
    ]
})

module.exports = mongoose.model("User", userSchema);