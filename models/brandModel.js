const db = require("../config/db");

const BrandModel = {
    getAll: ()=> db.query("SELECT brand_id, brand_name FROM brands"),
}
module.exports = BrandModel;