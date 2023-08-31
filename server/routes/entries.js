const express = require("express");
const router = express.Router();
const handleAsync = require("express-async-handler");
const {
  getEntries,
  addEntry,
  editEntry,
  deleteEntry,
} = require("../controllers/entries");
const passport = require("passport");
const validateEntrySchema = require("../middleware/validateEntrySchema");
const multer = require("multer");
const { storage } = require("../config/cloudinary");
const upload = multer({ storage });

router
  .route("/")
  .post(
    passport.authenticate("jwt", { session: false }),
    upload.any(),
    validateEntrySchema,
    handleAsync(addEntry)
  );

router.route("/:userID").get(handleAsync(getEntries));

router
  .route("/:id")
  .put(
    passport.authenticate("jwt", { session: false }),
    validateEntrySchema,
    handleAsync(editEntry)
  )
  .delete(
    passport.authenticate("jwt", { session: false }),
    handleAsync(deleteEntry)
  );

module.exports = router;
