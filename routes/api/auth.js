const express = require("express");
const { tryCatchWrapper } = require("../../helpers/helpers");
const {
  register,
  login,
  logout,
  userInfo,
  upSubscription,
} = require("../../controllers/auth.controller");
const {
  authUser,
  upUserSubscription,
} = require("../../validationSchemas/schemasUsers");
const { validateAuth } = require("../../middlewares/validateAuth");
const { validateToken } = require("../../middlewares/validateToken");

const authRouter = express.Router();

authRouter.post("/register", validateAuth(authUser), tryCatchWrapper(register));
authRouter.get("/login", validateAuth(authUser), tryCatchWrapper(login));
authRouter.post(
  "/logout",
  tryCatchWrapper(validateToken),
  tryCatchWrapper(logout)
);
authRouter.get(
  "/current",
  tryCatchWrapper(validateToken),
  tryCatchWrapper(userInfo)
);
authRouter.patch(
  "/",
  tryCatchWrapper(validateToken),
  validateAuth(upUserSubscription),
  tryCatchWrapper(upSubscription)
);

module.exports = {
  authRouter,
};
