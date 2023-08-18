const express = require("express");
const router = express.Router();
const { registration, login } = require("../controlers/auth");
const {
  logout,
  getCurrentUser,
  updateSubscription,
} = require("../controlers/user");
const { validateAuth } = require("../middlewares/validateAuth");
const { validateToken } = require("../middlewares/validateToken");

router.post("/register", validateAuth, registration);
router.post("/login", validateAuth, login);
router.post("/logout", validateToken, logout);
router.get("/current", validateToken, getCurrentUser);
router.patch("/", validateToken, updateSubscription);

module.exports = router;
