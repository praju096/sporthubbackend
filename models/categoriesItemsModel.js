const db = require("../config/db");

const CategoriesItemsModel = {
    getAll: ()=> db.query("SELECT category_id, category_name FROM categories"),
}
module.exports = CategoriesItemsModel;