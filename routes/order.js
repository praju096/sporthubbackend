const express = require("express");
const router = express.Router();
const orderController = require("../controllers/orderController");
const { verifyToken } = require("../middleware/authMiddleware");

router.post("/", verifyToken, orderController.placeOrder);
router.get("/", verifyToken, orderController.getAllOrders);
router.get("/user", verifyToken, orderController.getUserOrders);
router.get("/:id", verifyToken, orderController.getOrderById);
router.patch("/:id/status", verifyToken, orderController.updateOrderStatus)

module.exports = router;
