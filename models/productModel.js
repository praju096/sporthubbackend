const db = require("../config/db");

const ProductModel = {
  getAll: () =>
    db.query(`
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
    c.category_name,
    c.category_id,
    b.brand_name,
    b.brand_id
  FROM products p
  LEFT JOIN categories c ON p.category_id = c.category_id
  LEFT JOIN brands b ON p.brand_id = b.brand_id
`),
  getById: (id) =>
    db.query(
      `SELECT 
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
    c.category_name,
    c.category_id,
    b.brand_name,
    b.brand_id
  FROM products p
  LEFT JOIN categories c ON p.category_id = c.category_id
  LEFT JOIN brands b ON p.brand_id = b.brand_id
  WHERE id = ?`,
      [id]
    ),
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
    db.query(
      `SELECT 
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
    b.brand_name,
    b.brand_id
  FROM products p
  LEFT JOIN categories c ON p.category_id = c.category_id
  LEFT JOIN brands b ON p.brand_id = b.brand_id
  LIMIT ? OFFSET ?`,
      [limit, offset]
    ),
  getTotalCount: () => db.query("SELECT COUNT(*) as total FROM products"),
  getBestsellers: () =>
    db.query(
      `SELECT 
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
    c.category_name,
    c.category_id,
    b.brand_name,
    b.brand_id
  FROM products p
  LEFT JOIN categories c ON p.category_id = c.category_id
  LEFT JOIN brands b ON p.brand_id = b.brand_id 
  WHERE bestseller = 1 ORDER BY id ASC LIMIT 4`
    ),
  getFeatured: () =>
    db.query(
      `SELECT 
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
    b.brand_name,
    b.brand_id
  FROM products p
  LEFT JOIN categories c ON p.category_id = c.category_id
  LEFT JOIN brands b ON p.brand_id = b.brand_id 
  WHERE featured_product = 1 ORDER BY id ASC LIMIT 8`
    ),
};

module.exports = ProductModel;
