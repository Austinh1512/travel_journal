const express = require("express");
const router = express.Router();
const handleAsync = require("express-async-handler");
const { getEntries, addEntry, editEntry, deleteEntry } = require("../controllers/entries");
const passport = require("passport");
const validateSchema = require("../middleware/validateSchema");

router.route("/")
    .get(handleAsync(getEntries))
    .post(passport.authenticate("jwt", { session: false }), validateSchema, handleAsync(addEntry))

router.route("/:id")
    .put(validateSchema, handleAsync(editEntry))
    .delete(handleAsync(deleteEntry))

module.exports = router;