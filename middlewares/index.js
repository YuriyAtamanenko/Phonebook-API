const validateAuth = require("./validateAuth");
const { validateData, validateStatusData } = require("./validateData");
const validateToken = require("./validateToken");
const validateUpdateSubscription = require("./validateUpdateSubscription");

module.exports = {
  validateAuth,
  validateData,
  validateStatusData,
  validateToken,
  validateUpdateSubscription,
};
