const Joi = require("joi")

const addContactSchema = Joi.object({
  name: Joi.string().min(2).required(),
  email: Joi.string().email().required(),
  phone: Joi.required(),
})

module.exports = {
  addContactSchema,
}
