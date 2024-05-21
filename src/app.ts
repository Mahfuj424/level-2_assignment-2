import express, { Application, Request, Response } from "express";
import cors from "cors";
import { ProductRoute } from "./modules/ecommerce/product-route";
import { OrderRoute } from "./modules/orders/order-route";
const app: Application = express();

// parser
app.use(express.json());
app.use(cors());

// product api
app.use("/api/products", ProductRoute);

// order api
app.use("/api/orders", OrderRoute);

app.get("/", (req: Request, res: Response) => {
  res.send("Hello World!");
});

app.use((req: Request, res: Response) => {
  res.status(404).json({
    success: false,
    message: "Route not found",
  });
});

export default app;
