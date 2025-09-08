const express = require("express");
const router = express.Router();
const orderController = require("../controllers/orderController");
const { verifyToken } = require("../middleware/authMiddleware");
const { isAdmin, hasRole } = require("../middleware/roleMiddleware");

router.post("/", verifyToken, orderController.placeOrder);
router.get(
  "/",
  verifyToken,
  hasRole(["admin", "merchant", "delivery_partner"]),
  orderController.getAllOrders
);
router.get("/user", verifyToken, orderController.getUserOrders);
router.get("/:id", verifyToken, orderController.getOrderById);
router.patch(
  "/:id/status",
  verifyToken,
  hasRole(["admin", "merchant", "delivery_partner"]),
  orderController.updateOrderStatus
);

module.exports = router;
