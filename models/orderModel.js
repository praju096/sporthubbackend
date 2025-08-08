const db = require("../config/db");

const OrderModel = {
  createOrder: async (data) => {
    const [result] = await db.query(`INSERT INTO orders SET ?`, [data]);
    return result.insertId;
  },

  insertOrderItem: (orderId, productId, quantity, price) => {
    return db.query(
      `INSERT INTO order_items (order_id, product_id, quantity, price)
     VALUES (?, ?, ?, ?)`,
      [orderId, productId, quantity, price]
    );
  },

  getOrdersByUser: (userId) => {
    return db.query(
      `SELECT * FROM orders WHERE user_id = ? ORDER BY created_at DESC`,
      [userId]
    );
  },

  getOrderById: (userId, orderId) => {
    return db.query(`SELECT * FROM orders WHERE id = ? AND user_id = ?`, [
      orderId,
      userId,
    ]);
  },

  getOrderItems: (orderId) => {
    return db.query(`SELECT * FROM order_items WHERE order_id = ?`, [orderId]);
  },
};
module.exports = OrderModel;
