const express = require("express");
const router = express.Router();
const userController = require("../controllers/userController");

router.get("/", userController.getAllUsers);
router.patch("/:id/role", userController.updateUserRole);
router.delete("/:id", userController.deleteUser);

module.exports = router;

