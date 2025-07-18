const WishlistModel = require('../models/wishlistModel');

exports.getWishlist = async (req, res) => {
  try {
    const [rows] = await WishlistModel.getByUser(req.user.id);
    res.json(rows);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching wishlist', error });
  }
};

exports.addToWishlist = async (req, res) => {
  try {
    const { product_id } = req.body;
    if (!product_id) {
      return res.status(400).json({ message: 'Product ID is required' });
    }
    const [result] = await WishlistModel.add({
      user_id: req.user.id,
      product_id,
    });
    res.status(201).json({ id: result.insertId });
  } catch (error) {
    res.status(500).json({ message: 'Error adding to wishlist', error });
  }
};

exports.removeFromWishlist = async (req, res) => {
  try {
    await WishlistModel.remove(req.user.id, req.params.productId);
    res.json({ message: 'Item removed from wishlist' });
  } catch (error) {
    res.status(500).json({ message: 'Error removing item from wishlist', error });
  }
};
