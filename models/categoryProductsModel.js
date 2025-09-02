const db = require("../config/db");

exports.findProductsByCategory = async (category) => {
  let query = `SELECT 
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
  LEFT JOIN brands b ON p.brand_id = b.brand_id`;
  let params = [];

  switch (category) {
    case "men":
      query += " WHERE category_gender = ?";
      params.push("men");
      break;

    case "women":
      query += " WHERE category_gender = ?";
      params.push("women");
      break;

    case "kids":
      query += " WHERE category_gender = ?";
      params.push("kids");
      break;

    case "sale":
      query += " WHERE is_on_sale = 1";
      break;

    case "new-arrivals":
      query += " WHERE is_new = 1";
      break;
  }

  const [rows] = await db.query(query, params);
  return rows;
};
