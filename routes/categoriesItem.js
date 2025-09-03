const express = require("express");
const router = express.Router();
const categoryItemController = require("../controllers/categoriesItemsController");
const validate = require("../middleware/validate");
const { validateCategoriesItem, validateCategoriesItemId } = require("../middleware/validators/categoryItemValidator");

// Routes
router.get("/", categoryItemController.getAllCategoriesItems);
router.get("/:id", validateCategoriesItemId, validate, categoryItemController.getCategoriesItemById);
router.post("/", validateCategoriesItem, validate, categoryItemController.createCategoriesItem);
router.put("/:id", [...validateCategoriesItemId, ...validateCategoriesItem], validate, categoryItemController.updateCategoriesItem);
router.delete("/:id", validateCategoriesItemId, validate, categoryItemController.deleteCategoriesItem);

module.exports = router;
