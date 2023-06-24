const joi = require("joi")

const userValidator = joi.object({
    username : joi.string().required(),
    email : joi.string().email().required(),
    password : joi.string().min(8).required()
})

module.exports = userValidator