const express = require('express');
const router = express.Router();
const orderItemController = require('../controllers/orderItemController');

router.get('/:orderId', orderItemController.getItemsByOrder);
router.post('/', orderItemController.createItem);
router.delete('/:orderId', orderItemController.deleteItemsByOrder);

module.exports = router;
