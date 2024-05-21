import { Product } from "../ecommerce/product-model";
import { TOrder } from "./order-interface";
import { OrderServices } from "./order-services";
import OrderValidationSchema from "./order-validation";
import { Request, Response } from "express";

// create order controller
const createProduct = async (req: Request, res: Response) => {
  try {
    const orderData: TOrder = req.body;
    // validate with zod

    const zodParseData = OrderValidationSchema.parse(orderData);

    const product = await Product.findById(zodParseData.productId);
    if (!product) {
      return res.status(400).json({
        success: true,
        message: "Product Not Found",
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

    res.status(200).json({
      success: true,
      message: "Order created successfully",
      data: result,
    });
  } catch (err: any) {
    res.status(400).json({
      success: false,
      message: err.message || "Somthing went wrong",
      error: err,
    });
  }
};

// get all order controller
export const getAllOrder = async (req: Request, res: Response) => {
  try {
    const { email } = req.query;
    const result = await OrderServices.getAllOrderIntoDB(email as string);
    res.status(200).json({
      success: true,
      message: "Order fetched successfully",
      data: result,
    });
  } catch (err: any) {
    res.status(400).json({
      success: false,
      message: err.message || "Somthing went wrong",
      error: err,
    });
  }
};

export const OrderController = {
  createProduct,
  getAllOrder,
};
