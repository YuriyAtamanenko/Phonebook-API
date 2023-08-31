const validateAuth = require("./validateAuth");
const { validateData, validateStatusData } = require("./validateData");
const validateToken = require("./validateToken");
const validateUpdateSubscription = require("./validateUpdateSubscription");
const uploadImage = require("./uploadImage");
const validateEmail = require("./validateEmail");

module.exports = {
  validateAuth,
  validateData,
  validateStatusData,
  validateToken,
  validateUpdateSubscription,
  uploadImage,
  validateEmail,
};
