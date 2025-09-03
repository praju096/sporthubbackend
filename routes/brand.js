const express = require("express");
const router = express.Router();
const brandController = require("../controllers/brandController");
const {
  validateBrand,
  validateBrandId,
} = require("../middleware/validators/brandValidator");
const validate = require("../middleware/validate");

router.get("/", brandController.getAllBrands);
router.get("/:id", validateBrandId, validate, brandController.getBrandById);
router.post("/", validateBrand, validate, brandController.createBrand);
router.put(
  "/:id",
  [...validateBrandId, ...validateBrand],
  validate,
  brandController.updateBrand
);
router.delete("/:id", validateBrandId, validate, brandController.deleteBrand);

module.exports = router;