const { Unauthorized } = require("http-errors");
const jwt = require("jsonwebtoken");
const { User } = require("../models/user");

const { JWT_SECRET } = process.env;

async function validateToken(req, res, next) {
  const authHeader = req.headers.authorization || "";
  const [type, token] = authHeader.split(" ");
  // console.log("token", token);

  // TODO check validation
  if (type !== "Bearer" || !token) {
    throw Unauthorized("Not authorized");
  }

  try {
    const { id } = jwt.verify(token, JWT_SECRET);
    const user = await User.findById(id);
    // console.log("user", user);

    req.user = user;
  } catch (error) {
    if (error.name === "JsonWebTokenError") {
      throw Unauthorized("Not authorized");
    }
  }

  next();
}

module.exports = {
  validateToken,
};
