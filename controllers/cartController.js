const CartModel = require("../models/cartModel");
const { successResponse, errorResponse } = require("../utils/responseHandler");

exports.getCart = async (req, res) => {
  try {
    // console.log("logging userId:",req.user.id);
    const [rows] = await CartModel.getByUser(req.user.id);
    return successResponse(res, "Cart fetched successfully", rows);
  } catch (error) {
    return errorResponse(res, "Error fetching cart", 500, error);
  }
};

exports.addToCart = async (req, res) => {
  try {
    const { product_id, quantity } = req.body;
    const user_id = req.user.id;

    await CartModel.add({ user_id, product_id, quantity });
    return successResponse(res, "Item added to cart", null, 201);
  } catch (error) {
    return errorResponse(res, "Error adding to cart", 500, error);
  }
};

exports.updateCart = async (req, res) => {
  try {
    const productId = req.params.productId;
    const userId = req.user.id;
    const { quantity } = req.body;

    await CartModel.updateQuantity(userId, productId, quantity);
    return successResponse(res, "Cart updated successfully");
  } catch (error) {
    return errorResponse(res, "Error updating cart", 500, error);
  }
};

exports.removeFromCart = async (req, res) => {
  try {
    const productId = req.params.productId;
    const userId = req.user.id;

    await CartModel.remove(userId, productId);
    return successResponse(res, "Item removed from cart");
  } catch (error) {
    return errorResponse(res, "Error removing item", 500, error);
  }
};

exports.clearCart = async (req, res) => {
  try {
    const userId = req.user.id;

    await CartModel.clear(userId);
    return successResponse(res, "Cart cleared successfully");
  } catch (error) {
    return errorResponse(res, "Error clearing cart", 500, error);
  }
};