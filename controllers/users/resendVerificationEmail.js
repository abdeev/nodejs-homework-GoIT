const { createError, sendMail } = require("../../helpers");
const User = require("../../models/users");

async function resendVerificationEmail(req, res) {
  const { email } = req.body;
  const user = await User.findOne({ email });

  if (!user) {
    throw createError({ status: 404, message: "User not found" });
  }
  if (user.isVerified) {
    throw createError({ status: 400, message: "User is already verified" });
  }
  const verificationMessage = {
    to: email,
    subject: "Verification user email",
    html: `<a href="${verificationURL}">Click here to verify your Email</a>`,
  };

  await sendMail(verificationMessage);

  res.json({ message: "Email was resent succsessfully" });
}

module.exports = resendVerificationEmail;
