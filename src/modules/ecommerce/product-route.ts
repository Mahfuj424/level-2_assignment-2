import express from "express";
import { ProductController } from "./product-controller";

const router = express.Router();

router.post("/", ProductController.createProduct);
router.get("/", ProductController.getAllProduct);
router.get("/", ProductController.searchProduct);
router.get("/:productId", ProductController.getSingleProduct);
router.put("/:productId", ProductController.updateProduct);
router.delete("/:productId", ProductController.deleteProduct);

export const ProductRoute = router;
