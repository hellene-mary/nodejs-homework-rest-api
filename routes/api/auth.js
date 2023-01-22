const express = require("express");
const { tryCatchWrapper } = require("../../helpers/helpers");
const {
  register,
  login,
  logout,
} = require("../../controllers/auth.controller");
const { authUser } = require("../../validationSchemas/schemasUsers");
const { validateAuth } = require("../../middlewares/validateAuth");
const { validateToken } = require("../../middlewares/validateToken");

const authRouter = express.Router();

authRouter.post("/register", validateAuth(authUser), tryCatchWrapper(register));
authRouter.get("/login", validateAuth(authUser), tryCatchWrapper(login));
// logout
authRouter.post(
  "/logout",
  tryCatchWrapper(validateToken),
  tryCatchWrapper(logout)
);

module.exports = {
  authRouter,
};
