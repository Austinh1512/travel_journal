const express = require("express");
const router = express.Router();
const JournalEntry = require("../models/journalEntry");
const { entrySchema } = require("../schemas");

const validateSchema = async (req, res, next) => {
    try {
        await entrySchema.validateAsync(req.body);
        next();
    } catch(error) {
        res.status(400).json({"error": error.details.map(err => err.message).join(",")});
    }
}

router.get("/", async (req, res) => {
    const entries = await JournalEntry.find({});
    console.log("route hit");
    res.status(200).send(entries);
})

router.post("/", validateSchema,  async (req, res) => {
    const entry = new JournalEntry(req.body);
    await entry.save();
    res.status(200).send(entry);
})

router.put("/:id", async (req, res) => {
    const updated_entry = await JournalEntry.findByIdAndUpdate(req.params.id, req.body, { runValidators: true, new: true });
    await updated_entry.save();
    res.status(200).send(updated_entry);
})

router.delete("/:id", async (req, res) => {
    await JournalEntry.findByIdAndDelete(req.params.id);
    res.sendStatus(200);
})

module.exports = router;