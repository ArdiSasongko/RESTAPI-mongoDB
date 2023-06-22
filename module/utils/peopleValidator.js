const joi = require("joi")

const peopleValidator = joi.object({
    name: joi.string().required(),
    age : joi.number().required(),
    address : joi.string().required()
})

module.exports = peopleValidator