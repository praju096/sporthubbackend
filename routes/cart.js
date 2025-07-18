const express = require("express");
const router = express.Router();
const cartController = require("../controllers/cartController");
const { verifyToken } = require("../middleware/authMiddleware");

router.get("/", verifyToken, cartController.getCart);
router.post("/", verifyToken, cartController.addToCart);
router.put("/:productId", verifyToken, cartController.updateCart);
router.delete("/:productId", verifyToken, cartController.removeFromCart);
router.delete("/", verifyToken, cartController.clearCart);

module.exports = router;
