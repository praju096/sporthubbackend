const WishlistModel = require("../models/wishlistModel");
const { successResponse, errorResponse } = require("../utils/responseHandler");

exports.getAllWishlists = async (req, res) => {
  try {
    const [wishlists] = await WishlistModel.getAllWishlists();

    if (!wishlists || wishlists.length === 0) {
      return successResponse(res, "No wishlist data found", []);
    }

    return successResponse(res, "Wishlist data retrieved successfully", wishlists);
  } catch (error) {
    console.error("Error in getAllWishlists:", error);
    return errorResponse(res, "Failed to fetch wishlists data", 500);
  }
};