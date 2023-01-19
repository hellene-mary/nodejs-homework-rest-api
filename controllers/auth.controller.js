const { User } = require('../models/user')
const bcrypt = require("bcrypt");
// const jwt = require("jsonwebtoken");

// const { JWT_SECRET } = process.env;

async function register(req, res, next) {
  const { email, password } = req.body

  const salt = await bcrypt.genSalt()
  const hashedPassword = await bcrypt.hash(password, salt)

  try {
    const savedUser = await User.create({
      email, 
      password: hashedPassword,
    })

    res.status(201).json({
      "user": {
        email,
        subscription: savedUser.subscription,
        id: savedUser._id,
      }
    })
  } catch (error) {
    if (error.message.includes("E11000 duplicate key error")) {
      return res.status(409).json({ message: "User with this email already exists!" })
    }
  }
}

module.exports = {
  register,
}