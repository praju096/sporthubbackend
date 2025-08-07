const express = require("express");
const router = express.Router();
const userDetailController = require("../controllers/userDetailController");
const { verifyToken } = require("../middleware/authMiddleware");

router.get("/", verifyToken, userDetailController.getUserDetail);
router.post("/", verifyToken, userDetailController.addUserDetail);

module.exports = router;
