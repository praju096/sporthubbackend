const express = require("express");
const router = express.Router();
const deliveryPartnerController = require("../controllers/deliveryPartnerController");

const {
  adminLoginValidator,
} = require("../middleware/validators/adminValidator");
const validate = require("../middleware/validate");

router.post(
  "/auth/login",
  adminLoginValidator,
  validate,
  deliveryPartnerController.login
);
router.post("/auth/logout", deliveryPartnerController.logout);


module.exports = router;
