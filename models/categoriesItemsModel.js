const db = require("../config/db");

const CategoriesItemsModel = {
  getAll: () => db.query("SELECT category_id, category_name FROM categories"),

  getById: (category_id) =>
    db.query(
      "SELECT category_id, category_name FROM categories WHERE category_id = ?",
      [category_id]
    ),

  create: (categoryData) => {
    const { category_name } = categoryData;
    return db.query("INSERT INTO categories (category_name) VALUES (?)", [
      category_name,
    ]);
  },

  update: (category_id, categoryData) => {
    const { category_name } = categoryData;
    return db.query(
      "UPDATE categories SET category_name = ? WHERE category_id = ?",
      [category_name, category_id]
    );
  },

  delete: (category_id) =>
    db.query("DELETE FROM categories WHERE category_id = ?", [category_id]),
};

module.exports = CategoriesItemsModel;
