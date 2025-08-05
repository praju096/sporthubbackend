const express = require('express');
const router = express.Router();
const { verifyToken } = require('../middleware/authMiddleware');
const { isAdmin } = require('../middleware/roleMiddleware');
const adminController = require('../controllers/adminController');
const adminCartController = require("../controllers/adminCartController");
const adminWishlistController = require("../controllers/adminWishlistController");

router.post('/auth/login', adminController.login);
router.post('/auth/logout', adminController.logout);
router.get("/carts", verifyToken, isAdmin, adminCartController.getAllCarts);
router.get("/wishlists", verifyToken, isAdmin, adminWishlistController.getAllWishlists);

module.exports = router;
