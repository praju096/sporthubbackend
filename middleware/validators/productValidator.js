const { body, param, query } = require("express-validator");

exports.createProductValidator = [  
  body("name").notEmpty().withMessage("Product name is required"),
  body("price").isFloat({ gt: 0 }).withMessage("Price must be greater than 0"),
  body("category").notEmpty().withMessage("Category is required"),
  body("description").notEmpty().withMessage("Description is required"),
  body("original_price").optional().isFloat({ gt: 0 }),
  body("is_new").optional().isBoolean(),
  body("is_on_sale").optional().isBoolean(),
  body("bestseller").optional().isBoolean(),
  body("featured_product").optional().isBoolean(),
  body("category_gender").notEmpty().withMessage("Category gender is required"),
  body("rating").isFloat({ min: 0, max: 5 }).withMessage("Rating must be between 0 and 5"),
];

exports.updateProductValidator = [
  param("id").isNumeric().withMessage("Valid product ID is required"),
  body("price").optional().isNumeric().withMessage("Price must be a number"),
  body("rating").optional().isFloat({ min: 0, max: 5 }).withMessage("Rating must be between 0 and 5"),
];

exports.getProductByIdValidator = [
  param("id").isNumeric().withMessage("Valid product ID is required"),
];

exports.searchProductValidator = [
  query("query").notEmpty().withMessage("Search query is required"),
];

exports.paginationValidator = [
  query("page").optional().isInt({ min: 1 }).withMessage("Page must be a positive integer"),
  query("limit").optional().isInt({ min: 1 }).withMessage("Limit must be a positive integer"),
];
