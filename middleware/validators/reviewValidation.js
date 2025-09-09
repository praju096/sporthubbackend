const { body } = require("express-validator");

const reviewValidationRules = [
  body("product_id").isInt().withMessage("Product ID must be an integer"),
  body("title").notEmpty().withMessage("Title is required"),
  body("rating")
    .isFloat({ min: 0.5, max: 5 })
    .withMessage("Rating must be between 0.5 and 5"),
  body("comment").notEmpty().withMessage("Comment is required"),
];

module.exports = { reviewValidationRules };
