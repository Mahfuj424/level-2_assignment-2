import express, { Application, Request, Response } from "express";
import cors from "cors";
import { ProductRoute } from "./modules/ecommerce/product-route";
const app: Application = express();

// parser
app.use(express.json());
app.use(cors());

app.use("/api/products", ProductRoute);

app.get("/", (req: Request, res: Response) => {
  res.send("Hello World!");
});

export default app;
