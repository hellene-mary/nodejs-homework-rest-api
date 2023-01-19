const express = require("express");
const { tryCatchWrapper } = require("../../helpers/helpers");
const { register, login } = require("../../controllers/auth.controller");
const { authUser } = require("../../validationSchemas/schemasUsers");
const { validateAuth } = require("../../middlewares/validateAuth");

const authRouter = express.Router();

authRouter.post("/register", validateAuth(authUser), tryCatchWrapper(register));
authRouter.post("/login", validateAuth(authUser), tryCatchWrapper(login));

module.exports = {
  authRouter,
};
