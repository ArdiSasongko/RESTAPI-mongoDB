const joi = require("joi");

const loginValidator = joi.object({
  email: joi.string().email().required(),
  password: joi.string().required(),
}).or("email", "username");

module.exports = loginValidator;
