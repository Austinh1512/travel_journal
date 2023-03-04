const { entrySchema } = require("../schemas");

const validateSchema = async (req, res, next) => {
    try {
        await entrySchema.validateAsync(req.body.values);
        next();
    } catch(error) {
        res.status(400).json({"error": error.details.map(err => err.message).join(",")});
    }
}

module.exports = validateSchema;