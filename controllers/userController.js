const UserModel = require("../models/userModel");
const { successResponse, errorResponse } = require("../utils/responseHandler");

exports.getAllUsers = async (req, res) => {
  try {
    const [users] = await UserModel.getAll();
    return successResponse(res, "Users fetched successfully", users);
  } catch (error) {
    console.error("Get All Users Error:", error);
    return errorResponse(res, "Server error while fetching users", 500, {
      error: error.message,
    });
  }
};

exports.updateUserRole = async (req, res) => {
  try {
    const { id } = req.params;
    const { role } = req.body;

    if (!["admin", "user", "merchant", "delivery_partner"].includes(role)) {
      return errorResponse(
        res,
        "Invalid role. Allowed roles: admin or user",
        400
      );
    }

    const [roleRows] = await UserModel.getRoleByName(role);

    if (roleRows.length === 0) {
      return errorResponse(res, "Role does not exist", 400);
    }

    const roleId = roleRows[0].id;

    const [result] = await UserModel.updateRole(id, roleId);

    if (result.affectedRows === 0) {
      return errorResponse(res, "User not found", 404);
    }

    return successResponse(res, "Role updated successfully", { id, role });
  } catch (error) {
    console.error("Update User Role Error:", error);
    return errorResponse(res, "Server error while updating role", 500, {
      error: error.message,
    });
  }
};

exports.deleteUser = async (req, res) => {
  try {
    const { id } = req.params;

    const [result] = await UserModel.delete(id);

    if (result.affectedRows === 0) {
      return errorResponse(res, "User not found", 404);
    }

    return successResponse(res, "User deleted successfully", { id });
  } catch (error) {
    console.error("Delete User Error:", error);
    return errorResponse(res, "Server error while deleting user", 500, {
      error: error.message,
    });
  }
};
