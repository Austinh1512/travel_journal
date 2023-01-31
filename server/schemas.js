const Joi = require("joi");

module.exports.entrySchema = Joi.object({
    place: Joi.string().required(),
    country: Joi.string().required(),
    startDate: Joi.date().required(),
    endDate: Joi.date().greater(Joi.ref("startDate")).required(),
    description: Joi.string().required()
})