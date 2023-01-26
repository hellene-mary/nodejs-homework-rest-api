const { User } = require("../models/user");
const bcrypt = require("bcrypt");
const { Conflict, Unauthorized } = require("http-errors");
const jwt = require("jsonwebtoken");
const gravatar = require("gravatar");
const path = require("path");
const fs = require("fs/promises");
const Jimp = require("jimp");

const { JWT_SECRET } = process.env;

async function register(req, res, next) {
  const { email, password } = req.body;

  const salt = await bcrypt.genSalt();
  const hashedPassword = await bcrypt.hash(password, salt);

  try {
    const savedUser = await User.create({
      email,
      password: hashedPassword,
      avatarURL: gravatar.url(email),
    });

    res.status(201).json({
      user: {
        email,
        subscription: savedUser.subscription,
        id: savedUser._id,
        avatarURL: savedUser.avatarURL,
      },
    });
  } catch (error) {
    if (error.message.includes("E11000 duplicate key error")) {
      throw Conflict("User with this email already exists!");
    }
  }
}

async function login(req, res, next) {
  const { email, password } = req.body;

  const storedUser = await User.findOne({
    email,
  });

  if (!storedUser) {
    throw Unauthorized("Email is note valid");
  }

  const isPasswordValid = await bcrypt.compare(password, storedUser.password);
  if (!isPasswordValid) {
    throw Unauthorized("Email or password is wrong");
  }

  const payload = { id: storedUser._id };
  const token = jwt.sign(payload, JWT_SECRET, { expiresIn: "6h" });

  await User.findByIdAndUpdate(storedUser._id, { token });

  return res.status(200).json({
    token: token,
    user: {
      email,
      subscription: storedUser.subscription,
      id: storedUser._id,
    },
  });
}

async function logout(req, res, next) {
  const storedUser = req.user;

  await User.findByIdAndUpdate(storedUser._id, { token: "" });

  return res.status(204).end();
}

async function userInfo(req, res, next) {
  const { user } = req;
  const { email, subscription } = user;

  return res.status(200).json({
    user: {
      email,
      subscription,
    },
  });
}

async function upSubscription(req, res, next) {
  const { id } = req.user;

  const upUser = await User.findByIdAndUpdate(id, req.body, { new: true });

  res.status(200).json(upUser);
}

async function upAvatar(req, res, next) {
  const { id } = req.user;
  const { filename } = req.file;

  const tmpPath = path.resolve(__dirname, "../tmp", filename);
  const publicPath = path.resolve(__dirname, "../public/avatars", filename);

  await Jimp.read(tmpPath)
    .then((image) => {
      return image.resize(250, 250).write(tmpPath);
    })
    .catch((err) => {
      console.error(err);
    });

  try {
    await fs.rename(tmpPath, publicPath);
  } catch (error) {
    await fs.unlink(tmpPath);
    throw error;
  }

  const upUser = await User.findByIdAndUpdate(
    id,
    {
      avatarURL: `/public/avatars/${filename}`,
    },
    { new: true }
  );
  console.log("upUser", upUser);

  return res.status(200).json({
    user: {
      email: upUser.email,
      avatarURL: upUser.avatarURL,
    },
  });
}

module.exports = {
  register,
  login,
  logout,
  userInfo,
  upSubscription,
  upAvatar,
};
