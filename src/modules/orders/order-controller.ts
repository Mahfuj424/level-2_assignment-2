import { OrderServices } from "./order-services";
import OrderValidationSchema from "./order-validation";
import { Request, Response } from "express";

// create order controller
const createProduct = async (req: Request, res: Response) => {
  try {
    const orderData = req.body;
    // validate with zod
    const zodParseData = OrderValidationSchema.parse(orderData);

    const result = await OrderServices.createOrderIntoDB(zodParseData);
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
    const {email} = req.query;
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
