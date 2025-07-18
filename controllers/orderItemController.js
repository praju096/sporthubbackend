const OrderItemModel = require('../models/orderItemModel');

exports.getItemsByOrder = async (req, res) => {
  try {
    const [rows] = await OrderItemModel.getByOrderId(req.params.orderId);
    res.json(rows);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching order items', error });
  }
};

exports.createItem = async (req, res) => {
  try {
    const { order_id, product_id, quantity, price } = req.body;
    if (!order_id || !product_id || !quantity || !price) {
      return res.status(400).json({ message: 'Missing required fields' });
    }
    const [result] = await OrderItemModel.create(req.body);
    res.status(201).json({ id: result.insertId });
  } catch (error) {
    res.status(500).json({ message: 'Error creating order item', error });
  }
};

exports.deleteItemsByOrder = async (req, res) => {
  try {
    await OrderItemModel.deleteByOrderId(req.params.orderId);
    res.json({ message: 'Order items deleted' });
  } catch (error) {
    res.status(500).json({ message: 'Error deleting order items', error });
  }
};
