const express = require("express");
const router = express.Router();
const { registration, login } = require("../controlers/auth");
const {
  logout,
  getCurrentUser,
  updateSubscription,
  updateUserAvatar,
} = require("../controlers/user");
const {
  validateAuth,
  validateToken,
  validateUpdateSubscription,
  uploadImage,
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
router.patch(
  "/avatars",
  validateToken,
  uploadImage.single("avatar"),
  updateUserAvatar
);

module.exports = router;
