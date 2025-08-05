const CartModel = require("../models/cartModel");
const { successResponse, errorResponse } = require("../utils/responseHandler");

exports.getAllCarts = async (req, res) => {
  try {
    const [carts] = await CartModel.getAllCarts();

    if (!carts || carts.length === 0) {
      return successResponse(res, "No cart data found", []);
    }

    return successResponse(res, "Cart data retrieved successfully", carts);
  } catch (error) {
    console.error("Error in getAllCarts:", error);
    return errorResponse(res, "Failed to fetch cart data", 500);
  }
};

