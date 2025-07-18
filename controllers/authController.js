const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const UserModel = require("../models/userModel");
const { successResponse, errorResponse } = require("../utils/responseHandler");

exports.register = async (req, res) => {
  try {
    const { fullname, email, password, confirmPassword } = req.body;

    if (!fullname || !email || !password || !confirmPassword) {
      return errorResponse(res, "All fields are required", 400);
    }

    if (password !== confirmPassword) {
      return errorResponse(res, "Passwords do not match", 400);
    }

    const [existing] = await UserModel.findByEmail(email);
    if (existing.length > 0) {
      return errorResponse(res, "Email already exists", 409);
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const [result] = await UserModel.create({
      fullname,
      email,
      password: hashedPassword,
    });

    return successResponse(
      res,
      "User registered successfully",
      { userId: result.insertId },
      201
    );
  } catch (error) {
    console.error("Register Error:", error);
    return errorResponse(res, "Error registering user", 500, {
      error: error.message,
    });
  }
};

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

    return successResponse(res, "Login successful", {
      user: {
        id: user.id,
        fullname: user.fullname,
        email: user.email,
        role: user.role,
      },
    });
  } catch (err) {
    console.error("Login Error:", err);
    return errorResponse(res, "Login error", 500, { error: err.message });
  }
};

exports.getProfile = async (req, res) => {
  try {
    const [user] = await UserModel.findByEmail(req.user.email);

    if (!user.length) {
      return errorResponse(res, "User not found", 404);
    }

    const { password, ...userData } = user[0];

    return successResponse(res, "Profile fetched successfully", userData);
  } catch (error) {
    console.error("Profile Fetch Error:", error);
    return errorResponse(res, "Error fetching profile", 500, {
      error: error.message,
    });
  }
};

exports.logout = async (req, res) => {
  res.clearCookie("token", {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "strict",
  });
  res.json({ message: "Logged out successfully" });
};
