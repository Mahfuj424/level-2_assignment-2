import { z } from "zod";

const ProductVariantValidationSchema = z.object({
  type: z.string(),
  value: z.string(),
});

const InventoryValidationSchema = z.object({
  quantity: z.number(),
  inStock: z.boolean(),
});

const ProductValidationSchema = z.object({
  name: z.string(),
  description: z.string(),
  price: z.number(),
  category: z.string(),
  tags: z.array(z.string()),
  variants: z.array(ProductVariantValidationSchema),
  inventory: InventoryValidationSchema,
});

export default ProductValidationSchema;
