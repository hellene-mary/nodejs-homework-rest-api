const Joi = require("joi")

const addContactSchema = Joi.object({
  name: Joi.string().min(2).required(),
  email: Joi.string().email().required(),
  phone: Joi.required(),
}).required()

const putContctSchema = Joi.object({
  name: Joi.string().min(2),
  email: Joi.string().email(),
  phone: Joi.string(),
}).required()

module.exports = {
  addContactSchema,
  putContctSchema,
}
