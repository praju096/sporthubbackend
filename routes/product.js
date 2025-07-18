const express = require('express');
const router = express.Router();
const productController = require('../controllers/productController');
const uploadMiddleware = require('../middleware/uploadMiddleware');

router.get("/", productController.getAllProducts);
router.get('/paginated', productController.getAllProductsWithPage);
router.get('/bestsellers', productController.getBestsellerProducts);
router.get('/featured', productController.getFeaturedProducts);
router.get("/search", productController.searchProducts);
router.get('/:id', productController.getProductById);
router.post('/', uploadMiddleware.single("image"),productController.createProduct);
router.put('/:id', uploadMiddleware.single("image"),productController.updateProduct);
router.delete('/:id', productController.deleteProduct);

module.exports = router;
