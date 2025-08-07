const express = require("express");
const router = express.Router();
const productController = require("../controllers/productController");
const uploadMiddleware = require("../middleware/uploadMiddleware");
const {
  createProductValidator,
  updateProductValidator,
  getProductByIdValidator,
  searchProductValidator,
  paginationValidator,
} = require("../middleware/validators/productValidator");
const validate = require("../middleware/validate");

router.get("/", productController.getAllProducts);
router.get("/paginated", paginationValidator, validate, productController.getAllProductsWithPage);
router.get("/bestsellers", productController.getBestsellerProducts);
router.get("/featured", productController.getFeaturedProducts);
router.get("/search", searchProductValidator, validate, productController.searchProducts);
router.get("/:id", getProductByIdValidator, validate, productController.getProductById);
router.post(
  "/",
  uploadMiddleware.single("image"),
  createProductValidator,
  validate,
  productController.createProduct
);
router.put(
  "/:id",
  uploadMiddleware.single("image"),
  updateProductValidator,
  validate,
  productController.updateProduct
);
router.delete("/:id", getProductByIdValidator, validate, productController.deleteProduct);

module.exports = router;
