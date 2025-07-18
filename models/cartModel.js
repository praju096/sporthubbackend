const db = require('../config/db');

const CartModel = {
  getByUser: (userId) => db.query(
    `SELECT c.*, p.name AS product_name, p.image_url, p.price 
     FROM cart c JOIN products p ON c.product_id = p.id 
     WHERE c.user_id = ?`, [userId]
  ),
  add: (data) => db.query('INSERT INTO cart SET ?', [data]),
  updateQuantity: (userId, productId, quantity) =>
    db.query('UPDATE cart SET quantity = ? WHERE user_id = ? AND product_id = ?', [quantity, userId, productId]),
  remove: (userId, productId) => db.query('DELETE FROM cart WHERE user_id = ? AND product_id = ?', [userId, productId]),
  clear: (userId) => db.query('DELETE FROM cart WHERE user_id = ?', [userId]),
};

module.exports = CartModel;
