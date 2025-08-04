const WishlistModel = require("../models/wishlistModel");
const { successResponse, errorResponse } = require("../utils/responseHandler");

exports.getWishlist = async (req, res) => {
  try {
    const [rows] = await WishlistModel.getByUser(req.user.id);
    return successResponse(res, "Wishlist Fetch Successfully", rows);
  } catch (error) {
    return errorResponse(res, "Error fetching wishlist", 500, error);
  }
};

exports.addToWishlist = async (req, res) => {
  try {
    const { product_id } = req.body;
    if (!product_id) {
      return errorResponse(res, "Product ID is required", 400);
    }
    const [result] = await WishlistModel.add({
      user_id: req.user.id,
      product_id,
    });
    return successResponse(
      res,
      "Product added to wishlist",
      { id: result.insertId },
      201
    );
  } catch (error) {
    return errorResponse(res, "Error adding to wishlist", 500, error);
  }
};

exports.removeFromWishlist = async (req, res) => {
  try {
    await WishlistModel.remove(req.user.id, req.params.productId);
    return successResponse(res, "Product removed from wishlist");
  } catch (error) {
    return errorResponse(res, "Error removing product from wishlist", 500, error);
  }
};

exports.moveProductToCart = async (req, res) => {
  try {
    const user_id = req.user.id;
    const { product_id } = req.body;
    await WishlistModel.moveToCart(user_id, product_id);
    return successResponse(res, "Product moved to cart");
  } catch (error) {
    return errorResponse(res, "Failed to move product to cart", 500, error);
  }
};
