const db = require('../config/db');

const contactModel = {
  create: (data) => db.query("INSERT INTO contacts SET ?", [data]),
  findAll: () => db.query("SELECT * FROM contacts"),
  getById: (id) => db.query("SELECT * FROM products WHERE id = ?", [id]),
  delete: (id) => db.query("DELETE FROM contacts WHERE id = ?", [id]),
};

module.exports = contactModel;