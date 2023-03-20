const express = require("express");
const router = express.Router();
const handleAsync = require("express-async-handler");
const { getEntries, addEntry, editEntry, deleteEntry } = require("../controllers/entries");
const passport = require("passport");
const validateSchema = require("../middleware/validateSchema");
const multer = require("multer");
const { storage } = require("../config/cloudinary");
const upload = multer({ storage });


router.route("/")
    .get(handleAsync(getEntries))
    .post(passport.authenticate("jwt", { session: false }), upload.any(), validateSchema, handleAsync(addEntry))

router.route("/:id")
    .put(validateSchema, handleAsync(editEntry))
    .delete(passport.authenticate("jwt", { session: false }), handleAsync(deleteEntry))

module.exports = router;