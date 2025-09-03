const { body, param } = require("express-validator");

const validateBrand = [
  body("brand_name")
    .trim()
    .notEmpty()
    .withMessage("Brand name is required")
    .isLength({ min: 2 })
    .withMessage("Brand name must be at least 2 characters long")
    .isLength({ max: 50 })
    .withMessage("Brand name must not exceed 50 characters"),
];

const validateBrandId = [
  param("id")
    .isInt({ min: 1 })
    .withMessage("Brand ID must be a positive integer"),
];

module.exports = {
  validateBrand,
  validateBrandId,
};
