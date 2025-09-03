const db = require("../config/db");

const BASE_SELECT = `
  SELECT 
    p.id,
    p.name,
    p.price,
    p.original_price,
    p.description,
    p.image_url,
    p.category_gender,
    p.is_new,
    p.is_on_sale,
    p.bestseller,
    p.featured_product,
    p.created_at,
    p.rating,
    c.category_id,
    c.category_name,
    b.brand_id,
    b.brand_name
  FROM products p
  LEFT JOIN categories c ON p.category_id = c.category_id
  LEFT JOIN brands b ON p.brand_id = b.brand_id
`;

const ProductModel = {
  getAll: () => db.query(BASE_SELECT),

  getById: (id) => db.query(`${BASE_SELECT} WHERE p.id = ?`, [id]),

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
    db.query(`${BASE_SELECT} LIMIT ? OFFSET ?`, [limit, offset]),

  getTotalCount: () => db.query("SELECT COUNT(*) AS total FROM products"),

  getBestsellers: () =>
    db.query(`${BASE_SELECT} WHERE p.bestseller = 1 ORDER BY p.id ASC LIMIT 4`),

  getFeatured: () =>
    db.query(
      `${BASE_SELECT} WHERE p.featured_product = 1 ORDER BY p.id ASC LIMIT 8`
    ),
};

module.exports = ProductModel;
