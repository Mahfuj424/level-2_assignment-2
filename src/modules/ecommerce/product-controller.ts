import { Request, Response } from "express";
import { ProductServices } from "./product-services";
import ProductValidationSchema from "./product-validation";
import { TProduct } from "./product-interface";

// Creating a product controller
const createProduct = async (req: Request, res: Response) => {
  try {
    const productData: TProduct = req.body;
    // Validate with zod
    const zodParseData = ProductValidationSchema.parse(productData);

    const result = await ProductServices.createProductIntoDB(zodParseData);
    res.status(201).json({
      success: true,
      message: "Product created successfully",
      data: result,
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: "Failed to create product",
      error: err,
    });
  }
};

// Find all product controller
export const getAllProduct = async (req: Request, res: Response) => {
  try {
    const { searchTerm } = req.query;

    const result = await ProductServices.getAllProductIntoDB(
      searchTerm as string,
    );

    if (result.length === 0) {
      return res.status(404).json({
        success: false,
        message: "No products found",
      });
    }

    res.status(200).json({
      success: true,
      message: searchTerm
        ? `Products matching search term "${searchTerm}" fetched successfully!`
        : "Products fetched successfully",
      data: result,
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: "Failed to fetch products",
      error: err,
    });
  }
};

// Get single product controller
export const getSingleProduct = async (req: Request, res: Response) => {
  try {
    const { productId } = req.params;
    const result = await ProductServices.getSingleProductIntoDB(productId);
    if (!result) {
      return res.status(404).json({
        success: false,
        message: "Product not found",
      });
    }
    res.status(200).json({
      success: true,
      message: "Product fetched successfully",
      data: result,
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: "Failed to fetch product",
      error: err,
    });
  }
};

// Update a product controller
export const updateProduct = async (req: Request, res: Response) => {
  try {
    const { productId } = req.params;
    const updatedData = req.body;

    // Validate with zod
    const validateProductData = ProductValidationSchema.parse(updatedData);

    const result = await ProductServices.updateProductIntoDB(
      productId,
      validateProductData,
    );
    if (!result) {
      return res.status(404).json({
        success: false,
        message: "Product not found",
      });
    }
    res.status(200).json({
      success: true,
      message: "Product updated successfully",
      data: result,
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: "Failed to update product",
      error: err,
    });
  }
};

// Delete product controller
export const deleteProduct = async (req: Request, res: Response) => {
  try {
    const { productId } = req.params;
    const result = await ProductServices.deleteProductIntoDB(productId);
    if (result.deletedCount === 0) {
      return res.status(404).json({
        success: false,
        message: `Product not found with id: ${productId}`,
      });
    }
    res.status(200).json({
      success: true,
      message: "Product deleted successfully",
      data: null,
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: "Failed to delete product",
      error: err,
    });
  }
};

export const ProductController = {
  createProduct,
  getAllProduct,
  getSingleProduct,
  updateProduct,
  deleteProduct,
};
