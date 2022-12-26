const bcrypt = require("bcryptjs");
const { randomUUID } = require("crypto");
const { createError, sendMail } = require("../../helpers");

const gravatar = require("gravatar");

const User = require("../../models/users");

const { BASE_URL } = process.env;

async function registerUser(req, res) {
  const { name, email, password } = req.body;

  const userInBase = await User.findOne({ email });

  if (userInBase) {
    throw createError({
      status: 409,
      meassage: "User with this Email is already in base",
    });
  }

  const hashPassword = await bcrypt.hash(password, 10);

  const avatarURL = gravatar.url(email, { protocol: "https" });

  const verificationToken = randomUUID();

  const result = await User.create({
    name,
    email,
    password: hashPassword,
    avatarURL,
    verificationToken,
  });

  const verificationURL = `${BASE_URL}/api/users/verify/${verificationToken}`;
  const verificationMessage = {
    to: email,
    subject: "Verification user email",
    html: `<a href="${verificationURL}">Click here to verify your Email</a>`,
  };

  await sendMail(verificationMessage);

  res.status(201).json({
    email: result.email,
  });
}

module.exports = registerUser;
