import { model, Schema } from "mongoose";
import { TOrder } from "./order-interface";

// order schema
const OrderSchema: Schema<TOrder> = new Schema<TOrder>({
  email: { type: String, required: true },
  productId: { type: String, required: true },
  price: { type: Number, required: true },
  quantity: { type: Number, required: true },
});

// Ensure no unique index on productId
OrderSchema.index({ productId: 1 }, { unique: false });

// order model
export const Order = model<TOrder>("Order", OrderSchema);
