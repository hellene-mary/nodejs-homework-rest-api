const Joi = require("joi")

const addNewUser = Joi.object({
  email: Joi.string().email().required(),
  password: Joi.string().min(3).required()
}).required()

module.exports = {
  addNewUser,
}