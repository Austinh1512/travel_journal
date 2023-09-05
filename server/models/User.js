const mongoose = require("mongoose");
const { Schema } = mongoose;
const bcrypt = require("bcrypt");

const userSchema = new Schema({
  username: {
    type: String,
    required: true,
    /*
     * Because full name is used as username when using
     * a Google account, allow for people who have
     * the same name to have duplicate usernames.
     */
    unique: function () {
      return !this.googleID;
    },
  },
  googleID: {
    type: String,
  },
  password: {
    type: String,
    //required if not using Google account
    required: function () {
      return !this.googleID;
    },
  },
  refreshToken: {
    type: String,
    default: "",
  },
  journal_entries: [
    {
      type: Schema.Types.ObjectId,
      ref: "JournalEntry",
    },
  ],
});

userSchema.pre("save", async function () {
  if (this.isModified("password")) {
    const SALT_ROUNDS = 10;
    const hash = await bcrypt.hash(this.password, SALT_ROUNDS);
    this.password = hash;
  }
});

module.exports = mongoose.model("User", userSchema);
