const db = require("../config/db");

const BrandModel = {
  getAll: () => db.query("SELECT brand_id, brand_name FROM brands"),

  getById: (brand_id) =>
    db.query("SELECT brand_id, brand_name FROM brands WHERE brand_id = ?", [
      brand_id,
    ]),

  create: (brandData) => {
    const { brand_name } = brandData;
    return db.query("INSERT INTO brands (brand_name) VALUES (?)", [brand_name]);
  },

  update: (brand_id, brandData) => {
    const { brand_name } = brandData;
    return db.query("UPDATE brands SET brand_name = ? WHERE brand_id = ?", [
      brand_name,
      brand_id,
    ]);
  },

  delete: (brand_id) =>
    db.query("DELETE FROM brands WHERE brand_id = ?", [brand_id]),
};

module.exports = BrandModel;
