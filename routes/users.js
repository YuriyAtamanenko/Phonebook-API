const express = require("express");
const router = express.Router();
const { registration, login } = require("../controlers/auth");
const {
  logout,
  getCurrentUser,
  updateSubscription,
} = require("../controlers/user");
const {
  validateAuth,
  validateToken,
  validateUpdateSubscription,
} = require("../middlewares");

router.post("/register", validateAuth, registration);
router.post("/login", validateAuth, login);
router.post("/logout", validateToken, logout);
router.get("/current", validateToken, getCurrentUser);
router.patch(
  "/",
  validateToken,
  validateUpdateSubscription,
  updateSubscription
);

module.exports = router;
