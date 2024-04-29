import { Schema, model } from "mongoose";

const collection = "products";
const schema = new Schema(
  {
    title: { type: String, required: true },
    category: { type: String, default: "proteina"},
    price: {type: Number, required: true },
    stock: {type: Number, required: true },
  },
  {
    timestamps: true,
  }
);

const Product = model(collection, schema);
export default Product;