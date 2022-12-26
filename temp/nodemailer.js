const nodemailer = require("nodemailer");

require("dotenv").config();

const { META_PASSWORD } = process.env;

const nodemailerConfig = {
  host: "smtp.meta.ua",
  port: 465,
  secure: true,
  auth: {
    user: "develope.node@meta.ua",
    pass: META_PASSWORD,
  },
};

const transport = nodemailer.createTransport(nodemailerConfig);

const msg = {
  to: "abdeev.vov@gmail.com", // Change to your recipient
  from: "develope.node@meta.ua", // Change to your verified sender
  subject: "Sending with NodeMailer is Fun",
  text: "and easy to do anywhere, even with Node.js",
  html: "<strong>and easy to do anywhere, even with Node.js</strong>",
};

transport
  .sendMail(msg)
  .then(() => console.log("Mail sended success"))
  .catch((error) => console.log(error.message));
