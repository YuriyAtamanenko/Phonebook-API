const User = require("../../models/user");
const bcrypt = require("bcrypt");

const registration = async (req, res) => {
  const { email, password } = req.body;
  const salt = await bcrypt.genSalt();
  const hashedPassword = await bcrypt.hash(password, salt);
  console.log(email, hashedPassword);
  try {
    const result = await User.create({ email, password: hashedPassword });

    const user = { email: result.email, subscription: result.subscription };
    return res.status(201).json({ user });
  } catch (error) {
    if (error.message.includes("E11000 duplicate key")) {
      return res.status(409).json({
        message: "Email in use",
      });
    }
  }
};

module.exports = registration;
