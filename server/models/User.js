const mongoose = require("mongoose");
const { Schema } = mongoose;
const bcrypt = require("bcrypt");

const userSchema = new Schema({
  username: {
    type: String,
    required: true,
    unique: true,
  },
  googleID: {
    type: String,
    unique: true,
  },
  password: {
    type: String,
    //required if not using google account
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
