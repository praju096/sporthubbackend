const { body } = require("express-validator");

exports.contactValidator = [
  body("name").notEmpty().withMessage("name is required"),
  body("email").isEmail().withMessage("Valid email is required"),
  body("subject").notEmpty().withMessage("Subject is required"),
  body("message").notEmpty().withMessage("Message is required"),
];
