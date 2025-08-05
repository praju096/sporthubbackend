const db = require("../config/db");

const CartModel = {
  // ========== USER SIDE ==========
  getByUser: (userId) =>
    db.query(
      `SELECT 
        cart.id,
        cart.user_id,
        cart.product_id,
        cart.quantity,
        products.name AS product_name,
        products.image_url,
        products.price
      FROM cart
      LEFT JOIN products ON cart.product_id = products.id
      WHERE cart.user_id = ?`,
      [userId]
    ),
  add: (data) => db.query("INSERT INTO cart SET ?", [data]),
  updateQuantity: (userId, productId, quantity) =>
    db.query(
      "UPDATE cart SET quantity = ? WHERE user_id = ? AND product_id = ?",
      [quantity, userId, productId]
    ),
  remove: (userId, productId) =>
    db.query("DELETE FROM cart WHERE user_id = ? AND product_id = ?", [
      userId,
      productId,
    ]),
  clear: (userId) => db.query("DELETE FROM cart WHERE user_id = ?", [userId]),

  // ========== ADMIN SIDE ==========
  getAllCarts: () =>
    db.query(
      `SELECT 
        cart.id AS cart_id,
        cart.user_id,
        users.fullname AS user_name,
        users.email AS user_email,
        cart.product_id,
        cart.quantity,
        products.name AS product_name,
        products.image_url,
        products.price
      FROM cart
      LEFT JOIN users ON cart.user_id = users.id
      LEFT JOIN products ON cart.product_id = products.id
      ORDER BY cart.user_id`
    ),
};

module.exports = CartModel;
