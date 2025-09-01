const express = require("express");
const router = express.Router();
const contactController = require("../controllers/contactController");
const { contactValidator } = require("../middleware/validators/contactValidator");

router.post("/", contactValidator, contactController.createContact);
router.get("/", contactController.getContacts);
router.delete("/:id", contactController.deleteContact);

module.exports = router;
