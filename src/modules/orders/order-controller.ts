import { Product } from "../ecommerce/product-model";
import { TOrder } from "./order-interface";
import { OrderServices } from "./order-services";
import OrderValidationSchema from "./order-validation";
import { Request, Response } from "express";

// create order controller
const createOrder = async (req: Request, res: Response) => {
  try {
    const orderData: TOrder = req.body;

    // Validate order data
    const orderZodParse = OrderValidationSchema.parse(orderData);

    // Find the product by ID
    const product = await Product.findById(orderZodParse.productId);
    if (!product) {
      return res.status(400).json({
        success: false,
        message: "No data found with this product id",
      });
    }

    // Check product inventory
    if (product.inventory.quantity < orderZodParse.quantity) {
      return res.status(400).json({
        success: false,
        message: "Insufficient quantity available in inventory",
      });
    }

    // Create order into DB
    const result = await OrderServices.createOrderIntoDB(orderZodParse);

    // Update product inventory
    product.inventory.quantity -= orderZodParse.quantity;
    product.inventory.inStock = product.inventory.quantity > 0;
    await product.save();

    // Respond with success
    res.status(200).json({
      success: true,
      message: "Order created successfully",
      data: result,
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: "An error occurred while creating the order",
      data: err,
    });
  }
};

// get all order controller
export const getAllOrder = async (req: Request, res: Response) => {
  try {
    const { email } = req.query;
    const result = await OrderServices.getAllOrderIntoDB(email as string);

    if (result.length === 0) {
      return res.status(404).json({
        success: false,
        message: "Order not found",
      });
    }

    res.status(200).json({
      success: email ? result.length > 0 : true,
      message: email
        ? result.length > 0
          ? "Orders fetched successfully for user email!"
          : "Email does not match"
        : "Orders fetched successfully",
      data: result.length > 0 ? result : null,
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: "Something went wrong",
      error: err,
    });
  }
};

export const OrderController = {
  createOrder,
  getAllOrder,
};
