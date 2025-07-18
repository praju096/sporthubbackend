const db = require('../config/db');

const WishlistModel = {
  getByUser: (userId) => db.query(
    `SELECT w.*, p.name AS product_name, p.image_url, p.price 
     FROM wishlist w JOIN products p ON w.product_id = p.id 
     WHERE w.user_id = ?`, [userId]
  ),
  add: (data) => db.query('INSERT INTO wishlist SET ?', [data]),
  remove: (userId, productId) => db.query('DELETE FROM wishlist WHERE user_id = ? AND product_id = ?', [userId, productId]),
};

module.exports = WishlistModel;
