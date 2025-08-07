const express = require("express");
const router = express.Router();
const { verifyToken } = require("../middleware/authMiddleware");
const { isAdmin } = require("../middleware/roleMiddleware");
const adminController = require("../controllers/adminController");
const adminCartController = require("../controllers/adminCartController");
const adminWishlistController = require("../controllers/adminWishlistController");
const {
  adminLoginValidator,
} = require("../middleware/validators/adminValidator");
const validate = require("../middleware/validate");

router.post(
  "/auth/login",
  adminLoginValidator,
  validate,
  adminController.login
);
router.post("/auth/logout", adminController.logout);
router.get("/carts", verifyToken, isAdmin, adminCartController.getAllCarts);
router.get(
  "/wishlists",
  verifyToken,
  isAdmin,
  adminWishlistController.getAllWishlists
);

module.exports = router;
