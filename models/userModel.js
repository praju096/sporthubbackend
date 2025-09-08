const db = require("../config/db");
const UserModel = {
  findByEmailWithRole: (email) => {
    return db.query(
      `SELECT u.id, u.fullname, u.email, u.password, r.role
       FROM users u
       JOIN roles r ON u.role_id = r.id
       WHERE u.email = ?`,
      [email]
    );
  },

  create: ({ fullname, email, password }) => {
    return db.query(
      "INSERT INTO users (fullname, email, password) VALUES (?, ?, ?)",
      [fullname, email, password]
    );
  },

  getAll: () => {
    return db.query(`
    SELECT u.id, u.fullname, u.email, r.role
    FROM users u
    LEFT JOIN roles r ON u.role_id = r.id`);
  },
  getRoleByName: (roleName) => {
    return db.query("SELECT id FROM roles WHERE role = ?", [roleName]);
  },

  updateRole: (userId, roleId) => {
    return db.query("UPDATE users SET role_id = ? WHERE id = ?", [
      roleId,
      userId,
    ]);
  },

  delete: (id) => {
    return db.query("DELETE FROM users WHERE id = ?", [id]);
  },
};
module.exports = UserModel;
