const categoryProductsModel = require("../models/categoryProductsModel");
const { successResponse, errorResponse } = require("../utils/responseHandler");

exports.getProductsByCategory = async (req, res) => {
  try {
    const { category } = req.params;

    const products = await categoryProductsModel.findProductsByCategory(category);

    if (!products || products.length === 0) {
      return errorResponse(res, "No products found for this category", 404);
    }

    return successResponse(res, "Products fetched successfully", products);
  } catch (error) {
    console.error("Error fetching category products:", error);
    return errorResponse(res, "Internal Server Error", 500, {
      error: error.message,
    });
  }
};
