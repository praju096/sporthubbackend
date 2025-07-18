const db = require("../config/db");
const UserModel = {
  findByEmail: (email) => {
  return db.query("SELECT * FROM users WHERE email = ?", [email]);
  },

  create: ({ fullname, email, password }) => {
    return db.query(
      "INSERT INTO users (fullname, email, password) VALUES (?, ?, ?)",
      [fullname, email, password]
    );
  },

  getAll: () => {
    return db.query("SELECT id, fullname, email, role FROM users");
  },
  update: (role, id) => {
    return db.query("UPDATE users SET role = ? WHERE id = ?", [role, id]);
  },

  delete: (id) => {
    return db.query("DELETE FROM users WHERE id = ?", [id]);
  },
};
module.exports = UserModel;