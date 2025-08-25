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
    return db.query(
      `SELECT 
        order_items.order_id,
        order_items.product_id,
        order_items.quantity,
        order_items.price,
        products.name AS product_name,
        products.image_url AS product_image
     FROM order_items
     LEFT JOIN products ON order_items.product_id = products.id
     WHERE order_items.order_id = ?`,
      [orderId]
    );
  },

  //---------------- Admin side ---------
  getAllOrdersWithUser: () => {
    return db.query(`
    SELECT o.id as order_id, o.user_id, ud.full_name, u.email,
           o.total, o.status, o.payment_method, o.shipping_method, o.delivered_at, o.expected_delivery,
           ud.phone, ud.address_line, ud.city, ud.state, ud.pincode, ud.country
    FROM orders o
    LEFT JOIN users u ON o.user_id = u.id
    LEFT JOIN user_detail ud ON o.userdetail_id = ud.id
    ORDER BY o.created_at ASC
  `);
  },
  updateOrderStatus: (status, id) => {
    let query = `UPDATE orders SET status = ?`;
    const values = [status];

    if (status === "delivered") {
      query += `, delivered_at = NOW(), expected_delivery = NULL`;
    } else if (status === "processing" || status === "shipped") {
      query += `, expected_delivery = DATE_ADD(NOW(), INTERVAL 5 DAY), delivered_at = NULL`;
    } else if (status === "pending" || status === "confirmed") {
      query += `, expected_delivery = NULL, delivered_at = NULL`;
    }

    query += ` WHERE id = ?`;
    values.push(id);

    return db.query(query, values);
  },
};
module.exports = OrderModel;
