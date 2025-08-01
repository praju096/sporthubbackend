const express = require("express");
const router = express.Router();
const wishlistController = require("../controllers/wishlistController");
const { verifyToken } = require("../middleware/authMiddleware");

router.get("/", verifyToken, wishlistController.getWishlist);
router.post("/", verifyToken, wishlistController.addToWishlist);
router.post("/movetocart", verifyToken, wishlistController.moveProductToCart);
router.delete(
  "/:productId",
  verifyToken,
  wishlistController.removeFromWishlist
);

module.exports = router;
