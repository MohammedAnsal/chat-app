const asyncHandler = require("express-async-handler");
const User = require("../models/userModel");
const generateToken = require("../config/generateToken");

//  SignUp :-

const signUp = asyncHandler(async (req, res) => {
  try {
    const { name, email, password } = req.body;

    if (!name || !email || !password)
      throw new Error("Please Enter All Feilds");

    const useExists = await User.findOne({ email });

    if (useExists) {
      res.status(400);
      throw new Error("User Already Exists");
    }

    const user = await User.create({
      name,
      email,
      password,
    });

    if (user)
      res
        .status(201)
        .json({
          _id: user._id,
          name: user.name,
          password: user.password,
          email: user.email,
          token: generateToken(user._id),
        });
  } catch (error) {
    res.status(400);
  }
});

module.exports = {
  signUp,
};
