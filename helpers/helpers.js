function tryCatchWrapper(enpointFn) {
  return async (req, res, next) => {
    try {
      await enpointFn(req, res, next)
    } catch (error) {
      return next(error)
    }
  }
}

class ValidationError extends Error {
  constructor(message) {
    super(message) // (1)
    this.name = "ValidationError" // (2)
  }
}

module.exports = {
  tryCatchWrapper,
  ValidationError,
}
