const { body, param } = require("express-validator");

const validateCategoriesItem = [
  body("category_name")
    .trim()
    .notEmpty().withMessage("Category name is required")
    .isLength({ min: 2 }).withMessage("Category name must be at least 2 characters long")
    .isLength({ max: 50 }).withMessage("Category name must not exceed 50 characters"),
];

const validateCategoriesItemId = [
  param("id")
    .isInt({ min: 1 }).withMessage("Category ID must be a positive integer"),
];

module.exports = {
  validateCategoriesItem,
  validateCategoriesItemId,
};
