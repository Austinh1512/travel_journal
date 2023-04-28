const BaseJoi = require("joi");
const sanitizeHtml = require("sanitize-html");

const extension = (joi) => ({
    type: "string",
    base: joi.string(),
    messages: {
        "string.sanitize": "{{#label}} can not include HTML"
    },
    rules: {
        sanitize: {
            validate(value, helpers) {
                const clean = sanitizeHtml(value, {
                    allowedTags: [],
                    allowedAttributes: {}
                })
                return ((clean !== value) ? helpers.error("string.sanitize", { value }) : clean);
            }
        }
    }
})

const Joi = BaseJoi.extend(extension);

module.exports.entrySchema = Joi.object({
    place: Joi.string().required().sanitize(),
    country: Joi.string().required().sanitize(),
    startDate: Joi.date().required(),
    endDate: Joi.date().greater(Joi.ref("startDate")).required(),
    description: Joi.string().required().sanitize(),
    images: Joi.array().required()
})

module.exports.userSchema = Joi.object({
    username: Joi.string().required().sanitize(),
    password: Joi.string().required().sanitize()
})