const jwt = require("jsonwebtoken");
const User = require("../models/userModel");
const asyncHandler = require("express-async-handler");

const protect = asyncHandler(async (req, res, next) => {
  try {
    let token;

    if (
      req.headers.authorization &&
      req.headers.authorization.startsWith("Bearer")
    ) {
      token = req.headers.authorization.split(" ")[1];

      //  Decode Token Id

      const decodeId = jwt.verify(token, process.env.JWT_TOKEN);

      req.user = await User.findById(decodeId.id).select("-password");

      next();
    }

    if (!token) {
      res.status(401);
      throw new Error("Not Authorized , no token");
    }
  } catch (error) {
    res.status(401);
    throw new Error("Not Authorized, Token Failed");
  }
});

module.exports = {protect};
