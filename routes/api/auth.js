const express = require("express");
const { tryCatchWrapper } = require("../../helpers/helpers");
const { register } = require("../../controllers/auth.controller");
const { addNewUser } = require("../../validation/schemasUsers");
const { validateNewUer } = require("../../middlewares/validateUsers");

const authRouter = express.Router();

authRouter.post(
  "/register",
  validateNewUer(addNewUser),
  tryCatchWrapper(register)
);

module.exports = {
  authRouter,
};
