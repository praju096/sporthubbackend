const { successResponse, errorResponse } = require("../utils/responseHandler");
const BrandModel = require("../models/brandModel");

exports.getAllBrands = async (req, res) => {
  try {
    const [brands] = await BrandModel.getAll();
    return successResponse(res, "Brand fetched successfully", brands);
  } catch (error) {
    return errorResponse(res, "Error fetching brands", 500, {
      error: error.message,
    });
  }
};