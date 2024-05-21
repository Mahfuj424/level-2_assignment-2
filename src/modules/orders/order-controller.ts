import { Product } from "../ecommerce/product-model";
import { TOrder } from "./order-interface";
import { OrderServices } from "./order-services";
import OrderValidationSchema from "./order-validation";
import { Request, Response } from "express";

// create order controller
const createProduct = async (req: Request, res: Response) => {
  try {
    const orderData: TOrder = req.body;
    // Validate with zod
    const zodParseData = OrderValidationSchema.parse(orderData);

    const product = await Product.findById(zodParseData.productId);
    if (!product) {
      return res.status(404).json({
        success: false,
        message: "Product not found",
      });
    }

    if (product.inventory.quantity < zodParseData.quantity) {
      return res.status(400).json({
        success: false,
        message: "Insufficient quantity available in inventory",
      });
    }

    const result = await OrderServices.createOrderIntoDB(zodParseData);

    product.inventory.quantity -= zodParseData.quantity;
    if (product.inventory.quantity === 0) {
      product.inventory.inStock = false;
    }

    await product.save();

    res.status(201).json({
      success: true,
      message: "Order created successfully",
      data: result,
    });
  } catch (err: any) {
    res.status(500).json({
      success: false,
      message: err.message || "Something went wrong",
      error: err,
    });
  }
};

// get all order controller
export const getAllOrder = async (req: Request, res: Response) => {
  try {
    const { email } = req.query;
    if (!email) {
      return res.status(400).json({
        success: false,
        message: "Email query parameter is required",
      });
    }

    const result = await OrderServices.getAllOrderIntoDB(email as string);
    res.status(200).json({
      success: true,
      message: "Orders fetched successfully",
      data: result,
    });
  } catch (err: any) {
    res.status(500).json({
      success: false,
      message: err.message || "Something went wrong",
      error: err,
    });
  }
};

export const OrderController = {
  createProduct,
  getAllOrder,
};
