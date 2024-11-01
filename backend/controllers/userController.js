const asyncHandler = require("express-async-handler");
const User = require("../models/userModel");
const generateToken = require("../config/generateToken");
const bcrypt = require("bcryptjs");

//  Bcrypt Password :-

const bcryptPassword = async (password) => {
  try {
    const salt = await bcrypt.genSalt(10);
    const hashedPass = await bcrypt.hash(password, salt);
    return hashedPass;
  } catch (error) {
    console.log(error.message);
  }
};

const signUp = asyncHandler(async (req, res) => {
  try {
    const { name, email, password, pics } = req.body;

    if (!name || !email || !password) {
      return res.status(400).json({ message: "Please Enter All Fields" });
    }

    const userExists = await User.findOne({ email });
    if (userExists) {
      return res.status(400).json({ message: "User Already Exists" });
    }

    const hashPassword = await bcryptPassword(String(password));

    const user = await User.create({
      name,
      email,
      password: hashPassword,
      picture: pics,
    });

    if (user) {
      return res.status(201).json({
        _id: user._id,
        name: user.name,
        email: user.email,
        picture: user.picture,
        token: generateToken(user._id),
      });
    } else {
      return res.status(500).json({ message: "Failed to create user" });
    }
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

const signIn = asyncHandler(async (req, res) => {
  try {
    const { email } = req.body;

    const user = await User.findOne({ email });

    if (user) {
      return res.status(201).json({
        _id: user._id,
        name: user.name,
        email: user.email,
        password: user.password,
        token: generateToken(user._id),
      });
    } else {
      return res.status(500).json({ message: "Login in Failed..." });
    }
  } catch (error) {
    res.status(400);
    throw new Error("Somthing Went Wrong");
  }
});

//  Search All User :-

const searchAllUser = asyncHandler(async (req, res) => {
  try {
    const searchKey = req.query.username
      ? {
          $or: [
            { name: { $regex: req.query.username, $options: "i" } },
            { email: { $regex: req.query.username, $options: "i" } },
          ],
        }
      : {};

    const users = await User.find(searchKey).find({ _id: { $ne: req.user._id } });
    res.send(users);
  } catch (error) {
    res.status(500);
  }
});

module.exports = {
  signUp,
  signIn,
  searchAllUser,
};
