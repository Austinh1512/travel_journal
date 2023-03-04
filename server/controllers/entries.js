const JournalEntry = require("../models/journalEntry");
const User = require("../models/User");

module.exports.getEntries = async (req, res) => {
    const { id } = req.query;
    const user = await User.findOne({ _id: id }).populate("journal_entries");

    if (!user) {
        return res.status(404).json({ "error": "Invalid credentials" });
    }

    res.status(200).send(user.journal_entries);

}

module.exports.addEntry = async (req, res) => {
    const { values, user } = req.body;
    const found_user = await User.findOne({ username: user.username });
    const entry = new JournalEntry(values);
    found_user.journal_entries.push(entry);
    await found_user.save();
    await entry.save();
    res.status(200).send(entry);
}

module.exports.editEntry = async (req, res) => {
    const updated_entry = await JournalEntry.findByIdAndUpdate(req.params.id, req.body, { runValidators: true, new: true });
    await updated_entry.save();
    res.status(200).send(updated_entry);
}

module.exports.deleteEntry = async (req, res) => {
    await JournalEntry.findByIdAndDelete(req.params.id);
    res.sendStatus(200);
}

