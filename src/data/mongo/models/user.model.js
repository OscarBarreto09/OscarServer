import { Schema, model } from "mongoose";
import mongoosePaginate from "mongoose-paginate-v2"

const collection = "users";
const schema = new Schema(
  {
    photo: {
      type: String,
      default:
        "https://raysensenbach.com/wp-content/uploads/2013/04/default.jpg",
    },
    email: { type: String, required: true, unique: true, index: true },
    password: { type: String, required: true },
    role: {
      type: Number,
      default: 0,
      enum: [0, 1],
      index: true,
    },
  },
  {
    timestamps: true,
  }
);

schema.plugin(mongoosePaginate);

const User = model(collection, schema);
export default User;


