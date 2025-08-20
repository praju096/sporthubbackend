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
const { verifyToken } = require("../middleware/authMiddleware");
const { isAdmin } = require("../middleware/roleMiddleware");

router.get("/", productController.getAllProducts);
router.get(
  "/paginated",
  verifyToken,
  isAdmin,
  paginationValidator,
  validate,
  productController.getAllProductsWithPage
);
router.get("/bestsellers", productController.getBestsellerProducts);
router.get("/featured", productController.getFeaturedProducts);
router.get(
  "/search",
  searchProductValidator,
  validate,
  productController.searchProducts
);
router.get(
  "/:id",
  getProductByIdValidator,
  validate,
  productController.getProductById
);
router.post(
  "/",
  verifyToken,
  isAdmin,
  uploadMiddleware.single("image"),
  createProductValidator,
  validate,
  productController.createProduct
);
router.put(
  "/:id",
  verifyToken,
  isAdmin,
  uploadMiddleware.single("image"),
  updateProductValidator,
  validate,
  productController.updateProduct
);
router.delete(
  "/:id",
  verifyToken,
  isAdmin,
  getProductByIdValidator,
  validate,
  productController.deleteProduct
);

module.exports = router;
