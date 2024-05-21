import { model, Schema } from "mongoose";
import { TOrder } from "./order-interface";

// order schema
const OrderSchema: Schema = new Schema<TOrder>({
  email: { type: String, require: true },
  productId: { type: String, require: true },
  price: { type: Number, require: true },
  quantity: { type: Number, require: true },
});

// order model
export const Order = model<TOrder>("order", OrderSchema);
