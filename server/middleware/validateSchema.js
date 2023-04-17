const { entrySchema } = require("../schemas");

const validateSchema = async (req, res, next) => {
    try {
        if (req.method === "POST") await entrySchema.validateAsync(JSON.parse(req.body.values));
        else if (req.method === "PUT") await entrySchema.validateAsync(req.body.values);
        next();
    } catch(error) {
        res.status(400).json({"error": error.details.map(err => err.message).join(",")});
    }
}

module.exports = validateSchema;