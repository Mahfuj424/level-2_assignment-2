import { TOrder } from "./order-interface";
import { Order } from "./order-model";

// create order into db
export const createOrderIntoDB = async (orderData: TOrder) => {
  const result = await Order.create(orderData);
  return result;
};

// get all order into db
export const getAllOrderIntoDB = async (email: string) => {
  if (email) {
    const result = await Order.find({ email });
    return result;
  } else {
    const result = await Order.find();
    return result;
  }
};



export const OrderServices = {
  createOrderIntoDB,
  getAllOrderIntoDB,
};
