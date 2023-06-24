const joi = require("joi")

const LoginValidator = joi.object({
    username : joi.string().required(),
    password : joi.string().required()
})

module.exports = LoginValidator