const CartModel = require('../models/cartModel');

exports.getCart = async (req, res) => {
  try {
    const [rows] = await CartModel.getByUser(req.user.id);
    res.json(rows);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching cart', error });
  }
};

exports.addToCart = async (req, res) => {
  try {
    const { product_id, quantity } = req.body;
    if (!product_id || !quantity) {
      return res.status(400).json({ message: 'Missing product ID or quantity' });
    }
    const [result] = await CartModel.add({
      user_id: req.user.id,
      product_id,
      quantity,
    });
    res.status(201).json({ id: result.insertId });
  } catch (error) {
    res.status(500).json({ message: 'Error adding to cart', error });
  }
};

exports.updateCart = async (req, res) => {
  try {
    const { quantity } = req.body;
    if (!quantity) {
      return res.status(400).json({ message: 'Quantity is required' });
    }
    await CartModel.updateQuantity(req.user.id, req.params.productId, quantity);
    res.json({ message: 'Cart updated' });
  } catch (error) {
    res.status(500).json({ message: 'Error updating cart', error });
  }
};

exports.removeFromCart = async (req, res) => {
  try {
    await CartModel.remove(req.user.id, req.params.productId);
    res.json({ message: 'Item removed from cart' });
  } catch (error) {
    res.status(500).json({ message: 'Error removing item from cart', error });
  }
};

exports.clearCart = async (req, res) => {
  try {
    await CartModel.clear(req.user.id);
    res.json({ message: 'Cart cleared' });
  } catch (error) {
    res.status(500).json({ message: 'Error clearing cart', error });
  }
};
