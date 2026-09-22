const User = require("../model/UserModel");
const { createSecretToken } = require("../util/SecretToken");
const bcrypt = require("bcryptjs");

const isProduction =
  process.env.NODE_ENV === "production" ||
  process.env.RENDER === "true" ||
  Boolean(process.env.RENDER);

const getCookieOptions = () => ({
  httpOnly: false,
  sameSite: isProduction ? "none" : "lax",
  secure: isProduction ? true : false,
  maxAge: 3 * 24 * 60 * 60 * 1000, // 3 days in ms
  path: "/",
});

module.exports.Signup = async (req, res) => {
  try {
    const { email, password, username } = req.body;
    if (!email || !password || !username) {
      return res
        .status(400)
        .json({ success: false, message: "All fields are required" });
    }
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res
        .status(400)
        .json({ success: false, message: "User already exists" });
    }
    const user = await User.create({ email, password, username });
    const token = createSecretToken(user._id);
    res.cookie("token", token, getCookieOptions());
    return res.status(201).json({
      message: "User signed up successfully",
      success: true,
      token,
      user: { username: user.username, email: user.email, id: user._id },
    });
  } catch (error) {
    console.error("Signup error:", error);
    return res
      .status(500)
      .json({ success: false, message: "Internal server error during signup" });
  }
};

module.exports.Login = async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res
        .status(400)
        .json({ success: false, message: "All fields are required" });
    }
    const user = await User.findOne({ email });
    if (!user) {
      return res
        .status(401)
        .json({ success: false, message: "Incorrect password or email" });
    }
    const auth = await bcrypt.compare(password, user.password);
    if (!auth) {
      return res
        .status(401)
        .json({ success: false, message: "Incorrect password or email" });
    }
    const token = createSecretToken(user._id);
    res.cookie("token", token, getCookieOptions());
    return res.status(200).json({
      message: "User logged in successfully",
      success: true,
      token,
      user: { username: user.username, email: user.email, id: user._id },
    });
  } catch (error) {
    console.error("Login error:", error);
    return res
      .status(500)
      .json({ success: false, message: "Internal server error during login" });
  }
};
