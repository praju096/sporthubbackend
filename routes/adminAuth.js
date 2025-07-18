const express = require('express');
const router = express.Router();
const userModel = require('../models/userModel');
const { verifyToken } = require('../middleware/authMiddleware');
const { isAdmin } = require('../middleware/roleMiddleware');
const adminController = require('../controllers/adminController');

router.post('/auth/login', adminController.login);
router.post('/auth/logout', adminController.logout);

// GET all users
router.get('/users', verifyToken, isAdmin, async (req, res) => {
  try {
    const [rows] = await userModel.getAll();
    res.json(rows);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching users', error });
  }
});

// DELETE user by ID
router.delete('/users/:id', verifyToken, isAdmin, async (req, res) => {
  try {
    await userModel.delete(req.params.id);
    res.json({ message: 'User deleted' });
  } catch (error) {
    res.status(500).json({ message: 'Error deleting user', error });
  }
});

module.exports = router;
