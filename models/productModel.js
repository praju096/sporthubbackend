const db = require("../config/db");

const ProductModel = {
  getAll: () => db.query("SELECT * FROM products"),
  getById: (id) => db.query("SELECT * FROM products WHERE id = ?", [id]),
  create: (data) => db.query("INSERT INTO products SET ?", [data]),
  update: (id, data) =>
    db.query("UPDATE products SET ? WHERE id = ?", [data, id]),
  delete: (id) => db.query("DELETE FROM products WHERE id = ?", [id]),
  searchProduct: (q) =>
    db.query("SELECT * FROM products WHERE name LIKE ? OR description LIKE ?", [
      `%${q}%`,
      `%${q}%`,
    ]),
  getPaginated: (limit, offset) =>
    db.query("SELECT * FROM products LIMIT ? OFFSET ?", [limit, offset]),
  getTotalCount: () => db.query("SELECT COUNT(*) as total FROM products"),
  getBestsellers: () =>
    db.query(
      "SELECT * FROM products WHERE bestseller = 1 ORDER BY id ASC LIMIT 4"
    ),
  getFeatured: () =>
    db.query(
      "SELECT * FROM products WHERE featured_product = 1 ORDER BY id ASC LIMIT 8"
    ),
};

module.exports = ProductModel;
