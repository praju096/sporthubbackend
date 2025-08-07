const express = require("express");
const router = express.Router();
const authController = require("../controllers/authController");
const { verifyToken } = require("../middleware/authMiddleware");
const {
  registerValidator,
  loginValidator,
} = require("../middleware/validators/authValidator");
const validate = require("../middleware/validate");

router.post("/register", registerValidator, validate, authController.register);
router.post("/login", loginValidator, validate, authController.login);
router.post("/logout", authController.logout);
router.get("/profile", verifyToken, authController.getProfile);

module.exports = router;
