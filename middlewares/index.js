const validateRegister = require("./validateRegister");
const validateLogin = require("./validateLogin");
const { validateData, validateStatusData } = require("./validateData");
const validateToken = require("./validateToken");
const validateUpdateSubscription = require("./validateUpdateSubscription");
const uploadImage = require("./uploadImage");
const validateEmail = require("./validateEmail");

module.exports = {
  validateRegister,
  validateData,
  validateStatusData,
  validateToken,
  validateUpdateSubscription,
  uploadImage,
  validateEmail,
  validateLogin,
};
