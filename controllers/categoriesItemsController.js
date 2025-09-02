const { successResponse, errorResponse } = require("../utils/responseHandler");
const CategoriesItemsModel = require("../models/categoriesItemsModel");

exports.getAllCategoriesItem = async (req, res) => {
  try {
    const [categoriesItems] = await CategoriesItemsModel.getAll();
    return successResponse(res, "CategoriesItems fetched successfully", categoriesItems);
  } catch (error) {
    return errorResponse(res, "Error fetching categoriesitems", 500, {
      error: error.message,
    });
  }
};