const Joi = require("joi");

const authUser = Joi.object({
  email: Joi.string().email().required(),
  password: Joi.string().min(3).required(),
}).required();

module.exports = {
  authUser,
};
