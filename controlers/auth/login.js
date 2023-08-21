const User = require("../../models/user");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");
dotenv.config();

const { JWT_SECRET } = process.env;

const login = async (req, res) => {
  const { email, password } = req.body;

  const result = await User.findOne({ email });

  if (!result) {
    return res.status(401).json({
      message: "Email or password is wrong",
    });
  }

  const isValidPassword = await bcrypt.compare(password, result.password);
  if (!isValidPassword) {
    return res.status(401).json({
      message: "Email or password is wrong",
    });
  }

  const token = jwt.sign({ id: result.id }, JWT_SECRET, {
    expiresIn: "12h",
  });

  const user = { email: result.email, subscription: result.subscription };
  return res.status(200).json({ token, user });
};

module.exports = login;
