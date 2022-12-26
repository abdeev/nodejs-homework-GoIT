const registerUser = require("./registerUser");
const loginUser = require("./loginUser");
const getCurrentUser = require("./getCurrentUser");
const logoutUser = require("./logoutUser");
const updateSubscribtionUser = require("./updateSubscribtionUser");
const updateUserAvatar = require("./updateUserAvatar");
const verify = require("./verify");
const resendVerificationEmail = require("./resendVerificationEmail");

module.exports = {
  registerUser,
  loginUser,
  getCurrentUser,
  logoutUser,
  updateSubscribtionUser,
  updateUserAvatar,
  verify,
  resendVerificationEmail,
};
