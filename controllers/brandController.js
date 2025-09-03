const { successResponse, errorResponse } = require("../utils/responseHandler");
const BrandModel = require("../models/brandModel");

exports.getAllBrands = async (req, res) => {
  try {
    const [brands] = await BrandModel.getAll();
    return successResponse(res, "Brands fetched successfully", brands);
  } catch (error) {
    return errorResponse(res, "Error fetching brands", 500, { error: error.message });
  }
};

exports.getBrandById = async (req, res) => {
  try {
    const { id } = req.params;
    const [rows] = await BrandModel.getById(id);

    if (rows.length === 0) {
      return errorResponse(res, "Brand not found", 404);
    }

    return successResponse(res, "Brand fetched successfully", rows[0]);
  } catch (error) {
    return errorResponse(res, "Error fetching brand", 500, { error: error.message });
  }
};

exports.createBrand = async (req, res) => {
  try {
    const { brand_name } = req.body;

    const [result] = await BrandModel.create({ brand_name });
    return successResponse(
      res,
      "Brand created successfully",
      { brand_id: result.insertId, brand_name },
      201
    );
  } catch (error) {
    return errorResponse(res, "Error creating brand", 500, { error: error.message });
  }
};

exports.updateBrand = async (req, res) => {
  try {
    const { id } = req.params;
    const { brand_name } = req.body;

    const [result] = await BrandModel.update(id, { brand_name });

    if (result.affectedRows === 0) {
      return errorResponse(res, "Brand not found", 404);
    }

    return successResponse(res, "Brand updated successfully", { brand_id: id, brand_name });
  } catch (error) {
    return errorResponse(res, "Error updating brand", 500, { error: error.message });
  }
};

exports.deleteBrand = async (req, res) => {
  try {
    const { id } = req.params;

    const [result] = await BrandModel.delete(id);

    if (result.affectedRows === 0) {
      return errorResponse(res, "Brand not found", 404);
    }

    return successResponse(res, "Brand deleted successfully");
  } catch (error) {
    return errorResponse(res, "Error deleting brand", 500, { error: error.message });
  }
};
