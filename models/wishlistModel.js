const db = require("../config/db");

const WishlistModel = {
  getByUser: (userId) =>
    db.query(
      `SELECT 
        wishlist.id AS wishlist_id,
        wishlist.user_id,
        wishlist.product_id,
        products.name AS product_name,
        products.image_url,
        products.price
    FROM 
        wishlist
    INNER JOIN 
        products ON wishlist.product_id = products.id
    WHERE 
        wishlist.user_id = ?`,
      [userId]
    ),
  add: (data) => db.query("INSERT INTO wishlist SET ?", [data]),
  remove: (userId, productId) =>
    db.query("DELETE FROM wishlist WHERE user_id = ? AND product_id = ?", [
      userId,
      productId,
    ]),
  moveToCart: (userId, productId) =>
    db.query(
      `INSERT INTO cart (user_id, product_id, quantity)
         VALUES (?, ?, 1)
         ON DUPLICATE KEY UPDATE quantity = quantity + 1`,
      [userId, productId]
    ),
};

module.exports = WishlistModel;
