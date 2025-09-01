const db = require("../config/db");

exports.findProductsByCategory = async (category) => {
  let query = "SELECT * FROM products";
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
