function validateNewContact(schema) {
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
      return res.status(400).json({ message: "missing fields" })
    }

    return next()
  }
}

module.exports = {
  validateNewContact,
  validateUpdateContact,
}
