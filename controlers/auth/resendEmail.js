const User = require("../../models/user");
const sendEmail = require("../../helppers/sendEmail");

const resendEmail = async (req, res) => {
  const { email } = req.body;

  const user = await User.findOne({ email });

  if (!user) {
    return res.status(404).json({
      message: "User not found",
    });
  }

  if (user.verify) {
    return res.status(400).json({
      message: "Verification has already been passed",
    });
  }

  await sendEmail({
    to: email,
    subject: "Hello! I'm test message for verify",
    text: "Hello! I'm test text for verify",
    html: `<a href="http://localhost:3000/users/verify/${user.vid}">Confirm your email</a>`,
  });

  return res.status(200).json({
    message: "Verification email sent",
  });
};

module.exports = resendEmail;
