const joi = require("joi")

const adminValidator = joi.object({
    username : joi.string().required(),
    password : joi.string().min(8).required()
})

module.exports = adminValidator