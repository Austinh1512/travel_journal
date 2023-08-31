const JournalEntry = require("../models/journalEntry");
const User = require("../models/User");
const { cloudinary } = require("../config/cloudinary");
const mongoose = require("mongoose");

module.exports.getEntries = async (req, res, next) => {
  const { userID } = req.params;

  if (!mongoose.isObjectIdOrHexString(userID)) {
    return res.status(500).json({ error: "Not a valid user ID" });
  }

  const user = await User.findOne({ _id: userID }).populate("journal_entries");

  if (!user) {
    return res.status(404).json({ error: "User does not exist." });
  }

  return res.status(200).send(user.journal_entries);
};

module.exports.addEntry = async (req, res) => {
  const values = JSON.parse(req.body.values);
  const user = JSON.parse(req.body.user);

  const found_user = await User.findOne({ username: user.username });
  const entry = new JournalEntry(values);
  entry.images = req.files.map((file) => ({
    url: file.path,
    filename: file.filename,
  }));
  found_user.journal_entries.push(entry);
  entry.user = found_user._id;
  await found_user.save();
  await entry.save();
  res.status(200).send(entry);
};

module.exports.editEntry = async (req, res) => {
  const { id } = req.params;

  if (!mongoose.isObjectIdOrHexString(id)) {
    return res.status(500).json({ error: "Not a valid entry ID" });
  }

  const updated_entry = await JournalEntry.findOneAndUpdate(
    { _id: id },
    req.body,
    { runValidators: true, new: true }
  );

  if (!updated_entry) {
    return res.status(404).json({ error: "Entry does not exist." });
  }

  return res.status(200).send(updated_entry);
};

module.exports.deleteEntry = async (req, res) => {
  const { id } = req.params;

  if (!mongoose.isObjectIdOrHexString(id)) {
    return res.status(500).json({ error: "Not a valid entry ID" });
  }

  const doc = await JournalEntry.findByIdAndDelete(id).populate("user");

  if (!doc) {
    return res.status(404).json({ error: "Entry does not exist." });
  }

  await User.findByIdAndUpdate(doc.user._id, {
    $pull: { journal_entries: doc._id },
  });
  doc.images.forEach((img) => {
    cloudinary.uploader.destroy(img.filename);
  });
  return res
    .status(200)
    .json({ type: "success", message: "Successfully deleted entry!" });
};
