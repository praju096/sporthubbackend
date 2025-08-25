const db = require("../config/db");
const OrderModel = require("../models/orderModel");
const CartModel = require("../models/cartModel");
const { successResponse, errorResponse } = require("../utils/responseHandler");

exports.placeOrder = async (req, res) => {
  try {
    const user_id = req.user.id;
    const { userdetail_id, payment_method, shipping_method } = req.body;

    const [cartItems] = await CartModel.getByUser(user_id);

    if (cartItems.length === 0) {
      return errorResponse(res, "Cart is empty", 400);
    }

    const total = cartItems.reduce(
      (sum, item) => sum + item.quantity * item.price,
      0
    );
    const data = {
      user_id,
      userdetail_id,
      payment_method,
      shipping_method,
      total,
    };
    const orderId = await OrderModel.createOrder(data);

    for (let item of cartItems) {
      await OrderModel.insertOrderItem(
        orderId,
        item.product_id,
        item.quantity,
        item.price
      );
    }

    await CartModel.clear(user_id);

    return successResponse(res, "Order placed successfully", { orderId });
  } catch (err) {
    console.error(err);
    return errorResponse(res, "Failed to place order", 500);
  }
};

exports.getUserOrders = async (req, res) => {
  const userId = req.user.id;
  const [orders] = await OrderModel.getOrdersByUser(userId);
  return successResponse(res, "Fetched user orders", orders);
};

exports.getOrderById = async (req, res) => {
  const userId = req.user.id;
  const orderId = req.params.id;
  const [order] = await OrderModel.getOrderById(userId, orderId);
  const [items] = await OrderModel.getOrderItems(orderId);
  return successResponse(res, "Fetched order", { order: order[0], items });
};

exports.getAllOrders = async (req, res) => {
  try {
    const [orders] = await OrderModel.getAllOrdersWithUser();

    return successResponse(res, "Fetched all orders", orders);
  } catch (err) {
    console.error(err);
    return errorResponse(res, "Failed to fetch orders", 500);
  }
};

exports.updateOrderStatus = async (req, res) => {
  try {
    if (req.user.role !== "admin") {
      return errorResponse(res, "Unauthorized", 403);
    }

    const { id } = req.params;
    const { status, expected_delivery } = req.body;

    if (!status) {
      return errorResponse(res, "Status is required", 400);
    }

    if (!["pending", "confirmed", "shipped", "delivered"].includes(status)) {
      return errorResponse(
        res,
        "Invalid status. Allowed: pending, confirmed, shipped, delivered",
        400
      );
    }

    const [rows] = await db.query("SELECT status FROM orders WHERE id = ?", [id]);
    if (rows.length === 0) {
      return errorResponse(res, "Order not found", 404);
    }

    const currentStatus = rows[0].status;

    if (status === "delivered" && currentStatus !== "shipped") {
      return errorResponse(res, "Order must be shipped before it can be delivered", 400);
    }

    const [result] = await OrderModel.updateOrderStatus(status, id, expected_delivery);

    if (result.affectedRows === 0) {
      return errorResponse(res, "Order not found", 404);
    }

    return successResponse(res, "Order status updated successfully", {
      id,
      status,
    });
  } catch (err) {
    console.error(err);
    return errorResponse(res, "Failed to update order status", 500);
  }
};




