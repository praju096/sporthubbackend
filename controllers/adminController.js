const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const UserModel = require("../models/userModel");
const { successResponse, errorResponse } = require("../utils/responseHandler");

exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return errorResponse(res, "Email and password are required", 400);
    }

    const [users] = await UserModel.findByEmail(email);
    if (!users.length) {
      return errorResponse(res, "User not found", 404);
    }

    const user = users[0];
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return errorResponse(res, "Invalid password", 401);
    }

    if (user.role !== "admin") {
      return errorResponse(res, "Access denied. Admins only.", 403);
    }

    const token = jwt.sign(
      { id: user.id, email: user.email, role: user.role },
      process.env.JWT_SECRET,
      { expiresIn: "1d" }
    );

    res.cookie("token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
      maxAge: 24 * 60 * 60 * 1000,
    });

    return successResponse(res, "Admin login successful", {
      user: {
        id: user.id,
        email: user.email,
        fullname: user.fullname,
        role: user.role,
      },
    });
  } catch (err) {
    console.error("Admin Login Error:", err);
    return errorResponse(res, "Login error", 500, { error: err.message });
  }
};

exports.logout = async (req, res) => {
  res.clearCookie("token", {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "strict",
  });
  res.json({ message: "Logged out admin successfully" });
};
