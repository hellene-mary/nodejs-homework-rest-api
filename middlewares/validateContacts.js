const { HttpError } = require("../helpers/helpers")

function validateContactField(schema) {
  return (req, res, next) => {
    const { error } = schema.validate(req.body)
    if (error) {
      return res.status(400).json({ message: "missing required name field" })
    }

    return next()
  }
}

function validateUpdateContact(schema) {
  return (req, res, next) => {
    const { error } = schema.validate(req.body)
    if (error) {
      return next(HttpError(400, error.message))
    }

    return next()
  }
}

module.exports = {
  validateContactField,
  validateUpdateContact,
}
