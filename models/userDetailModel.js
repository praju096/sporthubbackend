const db = require("../config/db");

const userDeatailModel = {
  getByUserDetailId: (userId) => {
    return db.query("SELECT * FROM user_detail WHERE user_id = ?", [userId]);
  },

  create: (data) => {
    return db.query(`INSERT INTO user_detail SET ?`, [data]);
  },
};
module.exports = userDeatailModel;
