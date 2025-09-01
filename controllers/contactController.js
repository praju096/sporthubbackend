const contactModel = require("../models/contactModel");
const { successResponse, errorResponse } = require("../utils/responseHandler");

exports.createContact = async (req, res) => {
  try {
    const { name, email, subject, message } = req.body;

    const data = {
      name,
      email,
      subject,
      message,
    };

    const [result] = await contactModel.create(data);

    return successResponse(res, "Message sent successfully!", {
      id: result.insertId,
      ...data,
    });
  } catch (error) {
    return errorResponse(res, "Error creating product", 500, {
      error: error.message,
    });
  }
};
exports.getContacts = async (req, res) => {
  try {
    const [contacts] = await contactModel.findAll();
    return successResponse(res, "Contacts fetched successfully", contacts);
  } catch (error) {
    return errorResponse(res, "Error fetching contacts", 500, {
      error: error.message,
    });
  }
};
exports.deleteContact = async (req, res) => {
  try {
    const contactId = req.params.id;
    const [[contact]] = await contactModel.getById(contactId);

    if (!contact) {
      return errorResponse(res, "Contact not found", 404);
    }

    await contactModel.delete(contactId);
    return successResponse(res, "Contact deleted successfully", {
      deletedContactId: contactId,
    });
  } catch (error) {
    return errorResponse(res, "Server error", 500, error);
  }
};
