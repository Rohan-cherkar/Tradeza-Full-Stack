const User = require("../model/UserModel");
require("dotenv").config();
const jwt = require("jsonwebtoken");

// Handler for POST / session verification
module.exports.userVerification = (req, res) => {
  const token = req.cookies?.token;
  if (!token) {
    return res.json({ status: false, message: "Not logged in" });
  }

  jwt.verify(token, process.env.TOKEN_KEY, async (err, data) => {
    if (err) {
      return res.json({ status: false, message: "Invalid token" });
    }
    try {
      const user = await User.findById(data.id);
      if (!user) {
        return res.json({ status: false, message: "User not found" });
      }
      return res.json({
        status: true,
        user: user.username,
        email: user.email,
        id: user._id,
      });
    } catch (error) {
      return res.json({ status: false, message: "Error verifying user" });
    }
  });
};

// Middleware for protected API endpoints
module.exports.requireAuth = (req, res, next) => {
  const token = req.cookies?.token;
  if (!token) {
    return res.status(401).json({ status: false, message: "Not logged in" });
  }

  jwt.verify(token, process.env.TOKEN_KEY, async (err, data) => {
    if (err) {
      return res.status(401).json({ status: false, message: "Invalid token" });
    }
    try {
      const user = await User.findById(data.id);
      if (!user) {
        return res
          .status(401)
          .json({ status: false, message: "User not found" });
      }
      req.user = user;
      next();
    } catch (error) {
      return res
        .status(500)
        .json({ status: false, message: "Internal server error" });
    }
  });
};
