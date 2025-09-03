const { successResponse, errorResponse } = require("../utils/responseHandler");
const CategoriesItemsModel = require("../models/categoriesItemsModel");

exports.getAllCategoriesItems = async (req, res) => {
  try {
    const [categories] = await CategoriesItemsModel.getAll();
    return successResponse(res, "Categories fetched successfully", categories);
  } catch (error) {
    return errorResponse(res, "Error fetching categories", 500, { error: error.message });
  }
};

exports.getCategoriesItemById = async (req, res) => {
  try {
    const { id } = req.params;
    const [rows] = await CategoriesItemsModel.getById(id);

    if (rows.length === 0) {
      return errorResponse(res, "Category not found", 404);
    }

    return successResponse(res, "Category fetched successfully", rows[0]);
  } catch (error) {
    return errorResponse(res, "Error fetching category", 500, { error: error.message });
  }
};

exports.createCategoriesItem = async (req, res) => {
  try {
    const { category_name } = req.body;

    const [result] = await CategoriesItemsModel.create({ category_name });
    return successResponse(
      res,
      "Category created successfully",
      { category_id: result.insertId, category_name },
      201
    );
  } catch (error) {
    return errorResponse(res, "Error creating category", 500, { error: error.message });
  }
};

exports.updateCategoriesItem = async (req, res) => {
  try {
    const { id } = req.params;
    const { category_name } = req.body;

    const [result] = await CategoriesItemsModel.update(id, { category_name });

    if (result.affectedRows === 0) {
      return errorResponse(res, "Category not found", 404);
    }

    return successResponse(res, "Category updated successfully", { category_id: id, category_name });
  } catch (error) {
    return errorResponse(res, "Error updating category", 500, { error: error.message });
  }
};

exports.deleteCategoriesItem = async (req, res) => {
  try {
    const { id } = req.params;

    const [result] = await CategoriesItemsModel.delete(id);

    if (result.affectedRows === 0) {
      return errorResponse(res, "Category not found", 404);
    }

    return successResponse(res, "Category deleted successfully");
  } catch (error) {
    return errorResponse(res, "Error deleting category", 500, { error: error.message });
  }
};
