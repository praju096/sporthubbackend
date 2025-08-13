const db = require("../config/db");

const OrderModel = {
  //------------ User Side -------------
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
      `SELECT * FROM orders WHERE user_id = ? ORDER BY created_at ASC`,
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

  //---------------- Admin side ---------
  getAllOrdersWithUser: () => {
    return db.query(`
    SELECT o.id as order_id, o.user_id, ud.full_name, u.email,
           o.total, o.status, o.payment_method, o.shipping_method,
           ud.phone, ud.address_line, ud.city, ud.state, ud.pincode, ud.country
    FROM orders o
    LEFT JOIN users u ON o.user_id = u.id
    LEFT JOIN user_detail ud ON o.userdetail_id = ud.id
    ORDER BY o.created_at ASC
  `);
  },
  updateOrderStatus: (status, id) => {
    return db.query(
      `UPDATE orders SET status = ? WHERE id = ?
  `,
      [status, id]
    );
  },
};
module.exports = OrderModel;
