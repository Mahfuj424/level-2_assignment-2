import { Schema, model } from "mongoose";
import { TInventory, TProduct, TProductVariant } from "./product-interface";

// Mongoose schema definitions
const ProductVariantSchema: Schema = new Schema<TProductVariant>({
  type: { type: String, required: true },
  value: { type: String, required: true },
});

const InventorySchema: Schema = new Schema<TInventory>({
  quantity: { type: Number, required: true },
  inStock: { type: Boolean, required: true },
});

const ProductSchema: Schema = new Schema<TProduct>({
  name: { type: String, required: true },
  description: { type: String, required: true },
  price: { type: Number, required: true },
  category: { type: String, required: true },
  tags: { type: [String], required: true },
  variants: { type: [ProductVariantSchema], required: true },
  inventory: { type: InventorySchema, required: true },
});

// product model
export const Product = model<TProduct>("Product", ProductSchema);
