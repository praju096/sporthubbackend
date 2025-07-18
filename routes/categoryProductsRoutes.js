const express = require("express");
const router = express.Router();
const categoryProductsController = require("../controllers/categoryProductsController");
const validateCategory = require("../middleware/validateCategory");

router.get("/:category", validateCategory, categoryProductsController.getProductsByCategory);

module.exports = router;
