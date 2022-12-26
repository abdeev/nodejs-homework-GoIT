const sgMail = require("@sendgrid/mail");
require("dotenv").config();
const { SENDGRID_API_KEY, SENDGRID_SENDER_EMAIL } = process.env;

sgMail.setApiKey(SENDGRID_API_KEY);

const sendMail = async (data) => {
  const msg = {
    ...data,
    from: SENDGRID_SENDER_EMAIL,
  };
  try {
    await sgMail.send(msg);
    return true;
  } catch (error) {
    throw error;
  }
};

module.exports = sendMail;
