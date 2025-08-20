const userDeatailModel = require("../models/userDetailModel");
const { successResponse, errorResponse } = require("../utils/responseHandler");

exports.getUserDetail = async (req, res) => {
  try {
    const userId = req.user.id;
    const [userDetail] = await userDeatailModel.getByUserDetailId(userId);
    return successResponse(res, "User detail fetched", userDetail);
  } catch (err) {
    return errorResponse(res, "Failed to fetch user detail", 500);
  }
};

exports.addUserDetail = async (req, res) => {
  try {
    const user_id = req.user.id;
    const { full_name, phone, address_line, city, state, pincode, country } =
      req.body;
    const data = {
      user_id,
      full_name,
      phone,
      address_line,
      city,
      state,
      pincode,
      country,
    };
    await userDeatailModel.create(data);
    return successResponse(res, "user detail added");
  } catch (err) {
    return errorResponse(res, "Failed to add user detail", 500);
  }
};
