const fs = require("fs");
const path = require("path");
const ProductModel = require("../models/productModel");
const { successResponse, errorResponse } = require("../utils/responseHandler");

exports.getBestsellerProducts = async (req, res) => {
  try {
    const [products] = await ProductModel.getBestsellers();
    return successResponse(
      res,
      "Bestseller products fetched successfully",
      products
    );
  } catch (error) {
    return errorResponse(res, "Error fetching bestseller products", 500, {
      error: error.message,
    });
  }
};

exports.getFeaturedProducts = async (req, res) => {
  try {
    const [products] = await ProductModel.getFeatured();
    return successResponse(
      res,
      "Featured products fetched successfully",
      products
    );
  } catch (error) {
    return errorResponse(res, "Error fetching featured products", 500, {
      error: error.message,
    });
  }
};

exports.getAllProducts = async (req, res) => {
  try {
    const [products] = await ProductModel.getAll();
    return successResponse(res, "Products fetched successfully", products);
  } catch (error) {
    return errorResponse(res, "Error fetching products", 500, {
      error: error.message,
    });
  }
};

exports.getAllProductsWithPage = async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const offset = (page - 1) * limit;

    const [[{ total }]] = await ProductModel.getTotalCount();
    const [products] = await ProductModel.getPaginated(limit, offset);

    return successResponse(
      res,
      "Products fetched successfully with pagination",
      {
        data: products,
        total,
        page,
        totalPages: Math.ceil(total / limit),
      }
    );
  } catch (error) {
    return errorResponse(res, "Error fetching products with pagination", 500, {
      error: error.message,
    });
  }
};

exports.searchProducts = async (req, res) => {
  try {
    const { query } = req.query;

    const [results] = await ProductModel.searchProduct(query);

    return successResponse(res, "Products searched successfully", results);
  } catch (error) {
    console.error("Search Error:", error);
    return errorResponse(res, "Internal server error", 500, {
      error: error.message,
    });
  }
};

exports.getProductById = async (req, res) => {
  try {
    const [rows] = await ProductModel.getById(req.params.id);

    if (!rows.length) {
      return errorResponse(res, "Product not found", 404);
    }

    return successResponse(res, "Product fetched successfully", rows[0]);
  } catch (error) {
    return errorResponse(res, "Error fetching product", 500, {
      error: error.message,
    });
  }
};

exports.createProduct = async (req, res) => {
  try {
    const {
      name,
      price,
      description,
      category_id,
      brand_id,
      category_gender,
      original_price,
      bestseller,
      featured_product,
      is_new,
      is_on_sale,
      rating,
    } = req.body;

    if (!req.file) {
      return errorResponse(res, "Missing file field required", 400);
    }

    const image_url = `/uploads/${req.file.filename}`;

    const data = {
      name,
      price,
      description,
      category_id,
      brand_id,
      category_gender,
      original_price,
      bestseller: bestseller === true || bestseller === "true" ? 1 : 0,
      featured_product:
        featured_product === true || featured_product === "true" ? 1 : 0,
      is_new: is_new === true || is_new === "true" ? 1 : 0,
      is_on_sale: is_on_sale === true || is_on_sale === "true" ? 1 : 0,
      rating,
      image_url,
    };

    const [result] = await ProductModel.create(data);

    return successResponse(res, "Product created successfully", {
      id: result.insertId,
      ...data,
    });
  } catch (error) {
    return errorResponse(res, "Error creating product", 500, {
      error: error.message,
    });
  }
};

exports.updateProduct = async (req, res) => {
  try {
    const productId = req.params.id;

    const [[product]] = await ProductModel.getById(productId);

    if (!product) {
      return errorResponse(res, "Product not found", 404);
    }

    const updatedData = { ...req.body };

    if ("bestseller" in updatedData) {
      updatedData.bestseller =
        updatedData.bestseller === true || updatedData.bestseller === "true"
          ? 1
          : 0;
    }
    if ("featured_product" in updatedData) {
      updatedData.featured_product =
        updatedData.featured_product === true ||
        updatedData.featured_product === "true"
          ? 1
          : 0;
    }
    if ("is_new" in updatedData) {
      updatedData.is_new =
        updatedData.is_new === true || updatedData.is_new === "true" ? 1 : 0;
    }
    if ("is_on_sale" in updatedData) {
      updatedData.is_on_sale =
        updatedData.is_on_sale === true || updatedData.is_on_sale === "true"
          ? 1
          : 0;
    }

    if (req.file) {
      if (product.image_url) {
        const oldImagePath = path.join(__dirname, `../${product.image_url}`);
        if (fs.existsSync(oldImagePath)) {
          fs.unlinkSync(oldImagePath);
        }
      }
      updatedData.image_url = `/uploads/${req.file.filename}`;
    }

    await ProductModel.update(productId, updatedData);

    return successResponse(res, "Product updated successfully", {
      id: productId,
      ...product,
      ...updatedData,
    });
  } catch (error) {
    return errorResponse(res, "Error updating product", 500, {
      error: error.message,
    });
  }
};

exports.deleteProduct = async (req, res) => {
  try {
    const productId = req.params.id;
    const [[product]] = await ProductModel.getById(productId);

    if (!product) {
      return errorResponse(res, "Product not found", 404);
    }

    if (product.image_url) {
      const imagePath = path.join(__dirname, `../${product.image_url}`);
      if (fs.existsSync(imagePath)) {
        fs.unlinkSync(imagePath);
      }
    }

    await ProductModel.delete(productId);

    return successResponse(res, "Product deleted successfully", {
      deletedProductId: productId,
    });
  } catch (error) {
    return errorResponse(res, "Error deleting product", 500, {
      error: error.message,
    });
  }
};
