const express = require("express");
const router = express.Router();
const {
  registration,
  login,
  // verifyEmail,
  // resendEmail,
} = require("../controlers/auth");
const {
  logout,
  getCurrentUser,
  updateSubscription,
  updateUserAvatar,
} = require("../controlers/user");
const {
  validateRegister,
  validateLogin,
  validateToken,
  validateUpdateSubscription,
  uploadImage,
  // validateEmail,
} = require("../middlewares");

router.post("/register", validateRegister, registration);
router.post("/login", validateLogin, login);
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
// router.get("/verify/:verificationToken", verifyEmail);
// router.post("/verify", validateEmail, resendEmail);

module.exports = router;
