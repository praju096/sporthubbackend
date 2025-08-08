const express = require("express");
const router = express.Router();
const orderController = require("../controllers/orderController");
const { verifyToken } = require("../middleware/authMiddleware");

router.post("/", verifyToken, orderController.placeOrder);
router.get("/user", verifyToken, orderController.getUserOrders);
router.get("/:id", verifyToken, orderController.getOrderById);

module.exports = router;
