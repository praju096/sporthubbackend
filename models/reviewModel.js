const db = require("../config/db");

const ReviewModel = {
  create: (reviewData) => {
    const { product_id, user_id, title, rating, comment } = reviewData;
    return db.query(
      "INSERT INTO product_reviews (product_id, user_id, title, rating, comment) VALUES (?, ?, ?, ?, ?)",
      [product_id, user_id, title, rating, comment]
    );
  },

  getByProductId: (product_id) =>
    db.query(
      `SELECT
          pr.id,
          pr.product_id,
          u.fullname AS user_name,
          pr.title,
          pr.rating,
          pr.comment,
          pr.created_at
        FROM
          product_reviews pr
        LEFT JOIN
          users u ON pr.user_id = u.id
        WHERE
          pr.product_id = ?
        ORDER BY
          pr.created_at DESC;
        `,
      [product_id]
    ),
};

module.exports = ReviewModel;
