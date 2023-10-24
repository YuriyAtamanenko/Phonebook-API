const User = require("../../models/user");
const bcrypt = require("bcrypt");
const gravatar = require("gravatar");
// const sendEmail = require("../../helppers/sendEmail");
// const { nanoid } = require("nanoid");

const registration = async (req, res) => {
  const { name, email, password } = req.body;
  const salt = await bcrypt.genSalt();
  const hashedPassword = await bcrypt.hash(password, salt);

  const avatarURL = gravatar.url(email);

  // const vid = nanoid();

  try {
    const result = await User.create({
      name,
      email,
      password: hashedPassword,
      avatarURL,
      // verificationToken: vid,
    });

    // await sendEmail({
    //   to: email,
    //   subject: "Hello! I'm test message for verify",
    //   text: "Hello! I'm test text for verify",
    //   html: `<a href="http://localhost:3000/users/verify/${vid}">Confirm your email</a>`,
    // });

    const user = { email: result.email, name: result.name };
    return res.status(201).json({ user });
  } catch (error) {
    if (error.message.includes("E11000 duplicate key")) {
      return res.status(409).json({
        message: "Email in use",
      });
    }

    // return res.status(403).json({ message: error.message });
  }
};

module.exports = registration;
