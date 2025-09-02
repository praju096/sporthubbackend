const express = require("express");
const router = express.Router();
const categoriesItemsController = require("../controllers/categoriesItemsController");

router.get("/", categoriesItemsController.getAllCategoriesItem);

module.exports = router;