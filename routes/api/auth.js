const express = require("express");
const { tryCatchWrapper } = require("../../helpers/helpers");
const { register, login } = require("../../controllers/auth.controller");
const { authUser } = require("../../validation/schemasUsers");
const { validateNewUer } = require("../../middlewares/validateUsers");

const authRouter = express.Router();

authRouter.post(
  "/register",
  validateNewUer(authUser),
  tryCatchWrapper(register)
);
authRouter.post("/login", validateNewUer(authUser), tryCatchWrapper(login));

module.exports = {
  authRouter,
};
