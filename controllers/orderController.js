const OrderModel = require('../models/orderModel');

exports.getAllOrders = async (req, res) => {
  try {
    const [rows] = await OrderModel.getAll();
    res.json(rows);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching orders', error });
  }
};

exports.getOrderById = async (req, res) => {
  try {
    const [rows] = await OrderModel.getById(req.params.id);
    if (!rows.length) {
      return res.status(404).json({ message: 'Order not found' });
    }
    res.json(rows[0]);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching order', error });
  }
};

exports.createOrder = async (req, res) => {
  try {
    const { user_id, total_amount, status } = req.body;
    if (!user_id || !total_amount || !status) {
      return res.status(400).json({ message: 'Missing required fields' });
    }
    const [result] = await OrderModel.create(req.body);
    res.status(201).json({ id: result.insertId, ...req.body });
  } catch (error) {
    res.status(500).json({ message: 'Error creating order', error });
  }
};

exports.updateOrder = async (req, res) => {
  try {
    await OrderModel.update(req.params.id, req.body);
    res.json({ message: 'Order updated' });
  } catch (error) {
    res.status(500).json({ message: 'Error updating order', error });
  }
};

exports.deleteOrder = async (req, res) => {
  try {
    await OrderModel.delete(req.params.id);
    res.json({ message: 'Order deleted' });
  } catch (error) {
    res.status(500).json({ message: 'Error deleting order', error });
  }
};
