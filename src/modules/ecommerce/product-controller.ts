import { Request, Response } from "express";
// import ProductValidationSchema from "./product-validation";
import { ProductServices } from "./product-services";
import ProductValidationSchema from "./product-validation";
import { TProduct } from "./product-interface";

// creating a product controller
const createProduct = async (req: Request, res: Response) => {
  try {
    const productData : TProduct = req.body;
    // validate with zod
    const zodParseData = ProductValidationSchema.parse(productData);

    const result = await ProductServices.createProductIntoDB(zodParseData);
    res.status(200).json({
      success: true,
      message: "Product created successfully",
      data: result,
    });
  } catch (err: any) {
    res.status(500).json({
      success: false,
      message: err.message || "Somthing went wrong",
      error: err,
    });
  }
};

// find all product controller
export const getAllProduct = async (req: Request, res: Response) => {
  try {
    const { searchTerm } = req.query;

    const result = await ProductServices.getAllProductIntoDB(
      searchTerm as string
    );
    res.status(200).json({
      success: true,
      message: `${searchTerm ? `Products matching search term ${searchTerm} fetched successfully!` : "Product fetched successfully"}`,
      data: result,
    });
  } catch (err: any) {
    res.status(500).json({
      success: false,
      message: err.message || "Somthing went wrong",
      error: err,
    });
  }
};

// get single product controller
export const getSingleProduct = async (req: Request, res: Response) => {
  try {
    const { productId } = req.params;
    const result = await ProductServices.getSingleProductIntoDB(productId);
    res.status(200).json({
      success: true,
      message: "Product fetched successfully",
      data: result,
    });
  } catch (err: any) {
    res.status(500).json({
      success: false,
      message: err.message || "Somthing went wrong",
      error: err,
    });
  }
};

// update a product controller
export const updateProduct = async (req: Request, res: Response) => {
  try {
    const { productId } = req.params;
    const updatedData = req.body;

    //   validate with zod
    const validateProductData = ProductValidationSchema.parse(updatedData);

    const result = await ProductServices.updateProductIntoDB(
      productId,
      validateProductData
    );
    res.status(200).json({
      success: true,
      message: "Product updated successfully",
      data: result,
    });
  } catch (err: any) {
    res.status(500).json({
      success: false,
      message: err.message || "Somthing went wrong",
      error: err,
    });
  }
};

// delete product controller
export const deleteProduct = async (req: Request, res: Response) => {
  try {
    const { productId } = req.params;
    const result = await ProductServices.deleteProductIntoDB(productId);
    res.status(200).json({
      success: true,
      message: "Product deleted successfully",
      data: result,
    });
  } catch (err: any) {
    res.status(500).json({
      success: false,
      message: err.message || "Somthing went wrong",
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
