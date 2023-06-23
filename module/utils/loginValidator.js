const joi = require("joi")

const adminValidator = joi.object({
    username : joi.string().required(),
    password : joi.string().required()
})

module.exports = adminValidator