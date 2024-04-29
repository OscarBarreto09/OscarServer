import { Schema, model } from "mongoose";

const collection = "users";
const schema = new Schema(
  {
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    role: { type: Number, default: 0 },
    age: { type: Number, default: 20 },
    photo: {
      type: String,
      default: "https://raysensenbach.com/wp-content/uploads/2013/04/default.jpg",
    },
  },
  {
    timestamps: true,
  }
);

const User = model(collection, schema);
export default User;