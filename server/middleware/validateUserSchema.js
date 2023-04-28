const { userSchema } = require("../schemas");

const validateUserSchema = async (req, res, next) => {
    try {
        await userSchema.validateAsync(req.body);
        next();
    } catch(err) {
        res.status(400).json({"error": error.details.map(err => err.message).join(",")});
    }
}

module.exports = validateUserSchema;