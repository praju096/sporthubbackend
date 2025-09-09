const express = require("express");
const reviewController = require("../controllers/reviewController");
const {
  reviewValidationRules,
} = require("../middleware/validators/reviewValidation");
const { verifyToken } = require("../middleware/authMiddleware");

const router = express.Router();

router.post(
  "/",
  verifyToken,
  reviewValidationRules,
  reviewController.submitReview
);

router.get("/:product_id", reviewController.getReviewsByProduct);

module.exports = router;
