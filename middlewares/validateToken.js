const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");
dotenv.config();

const User = require("../models/user");

const { JWT_SECRET } = process.env;

const validateToken = async (req, res, next) => {
  const authHeader = req.headers.authorization || "";
  const [type, token] = authHeader.split(" ");

  if (type !== "Bearer") {
    return res.status(401).json({
      message: "Not authorized",
    });
  }

  try {
    const payload = jwt.verify(token, JWT_SECRET);
    const user = await User.findById(payload.id);
    req.user = user;
  } catch (error) {
    return res.status(401).json({
      message: "Not authorized",
    });
  }

  next();
};

module.exports = { validateToken };
