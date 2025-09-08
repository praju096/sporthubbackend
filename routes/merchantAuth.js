const express = require("express");
const router = express.Router();
const merchantController = require("../controllers/merchantController");

const {
  adminLoginValidator,
} = require("../middleware/validators/adminValidator");
const validate = require("../middleware/validate");

router.post(
  "/auth/login",
  adminLoginValidator,
  validate,
  merchantController.login
);
router.post("/auth/logout", merchantController.logout);


module.exports = router;
