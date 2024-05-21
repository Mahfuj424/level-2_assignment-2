import { TProduct } from "./product-interface";
import { Product } from "./product-model";

// create a product into db
export const createProductIntoDB = async (productData: TProduct) => {
  const result = await Product.create(productData);
  return result;
};

// get all product into db
export const getAllProductIntoDB = async (searchTerm: string) => {
  let query = {};
  if (searchTerm) {
    query = { name: { $regex: searchTerm, $options: "i" } };
  }
  const result = await Product.find(query);
  return result;
};

// get single product into db
export const getSingleProductIntoDB = async (id: string) => {
  const result = await Product.findOne({ _id: id });
  return result;
};

// update product into db
export const updateProductIntoDB = async (
  id: string,
  productData: TProduct
) => {
  const result = await Product.findOneAndUpdate({ _id: id }, productData);
  return result;
};

// product delete into db
export const deleteProductIntoDB = async (id: string) => {
  const result = await Product.deleteOne({ _id: id });
  return result;
};



export const ProductServices = {
  createProductIntoDB,
  getAllProductIntoDB,
  getSingleProductIntoDB,
  updateProductIntoDB,
  deleteProductIntoDB,
};
