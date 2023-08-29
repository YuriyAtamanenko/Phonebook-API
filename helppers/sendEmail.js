const sgMail = require("@sendgrid/mail");
const dotenv = require("dotenv");
dotenv.config();

const { SENDGRID_API_KEY, SENDER_EMAIL } = process.env;

const sendEmail = async ({ to, subject, text, html }) => {
  try {
    sgMail.setApiKey(SENDGRID_API_KEY);

    const msg = {
      to,
      from: SENDER_EMAIL,
      subject,
      text,
      html,
    };

    await sgMail.send(msg);

    return;
  } catch (error) {
    console.dir("ERROR", error);
  }
};
module.exports = sendEmail;
