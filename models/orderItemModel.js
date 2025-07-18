const db = require('../config/db');

const OrderItemModel = {
  getAll: () => db.query('SELECT * FROM order_items'),
  getByOrderId: (orderId) => db.query('SELECT * FROM order_items WHERE order_id = ?', [orderId]),
  create: (data) => db.query('INSERT INTO order_items SET ?', [data]),
  deleteByOrderId: (orderId) => db.query('DELETE FROM order_items WHERE order_id = ?', [orderId]),
};

module.exports = OrderItemModel;
