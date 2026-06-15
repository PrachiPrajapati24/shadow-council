const bcrypt = require("bcryptjs");
const User = require("../models/User");
const generateToken = require("../utils/generateToken");

const registerUser = async (
  username,
  email,
  password
) => {
  const existingUser =
    await User.findOne({
      $or: [
        { email },
        { username },
      ],
    });

  if (existingUser) {
    throw new Error(
      "User already exists"
    );
  }

  const hashedPassword =
    await bcrypt.hash(password, 10);

  const user =
    await User.create({
      username,
      email,
      password: hashedPassword,
    });

  const token =
    generateToken(user._id);

  return {
    id: user._id,
    username: user.username,
    email: user.email,
    token,
  };
};

const loginUser = async (
  email,
  password
) => {
  const user =
    await User.findOne({ email });

  if (!user) {
    throw new Error(
      "Invalid credentials"
    );
  }

  const isMatch =
    await bcrypt.compare(
      password,
      user.password
    );

  if (!isMatch) {
    throw new Error(
      "Invalid credentials"
    );
  }

  const token =
    generateToken(user._id);

  return {
    id: user._id,
    username: user.username,
    email: user.email,
    token,
  };
};

module.exports = {
  registerUser,
  loginUser,
};