import { Schema, Types,  model } from "mongoose";
import mongoosePaginate from "mongoose-paginate-v2";

const collection = "products";
const schema = new Schema(
  {
    title: { type: String, required: true, index: true },
    photo: {
      type: String,
      default:
        "https://upload.wikimedia.org/wikipedia/commons/d/d1/Image_not_available.png",
    },
    category: {
      type: String,
      default: "proteina",
      enum: ["proteina", "bcaa", "creatina", "quemador", "creatina_hipercalorica", "glutamina"],
      index: true,
    },
    price: { type: Number, default: 1 },
    stock: { type: Number, default: 1 },
    user_id: {
      type: Types.ObjectId,
      ref: "users",
      index: true,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

schema.plugin(mongoosePaginate);

schema.pre("find", function () {
  this.populate("user_id", "email photo_id");
});

schema.pre("findOne", function () {
  this.populate("user_id", "email");
});

const Product = model(collection, schema);
export default Product;