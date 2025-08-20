const express = require("express");
const router = express.Router();
const userController = require("../controllers/userController");
const { verifyToken } = require("../middleware/authMiddleware");
const { isAdmin } = require("../middleware/roleMiddleware");

router.get("/", verifyToken, isAdmin, userController.getAllUsers);
router.patch("/:id/role", verifyToken, isAdmin, userController.updateUserRole);
router.delete("/:id", verifyToken, isAdmin, userController.deleteUser);

module.exports = router;
