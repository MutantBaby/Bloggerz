import { Schema, model } from "mongoose";

const createSchema = new Schema(
  {
    title: {
      type: String,
      required: true,
    },
    body: {
      type: String,
      required: true,
    },
    category: {
      type: String,
      required: true,
    },
    image: {
      type: String,
    },
    author: {
      type: Schema.Types.ObjectId,
      ref: "Author_",
      required: true,
    },
  },
  { timestamps: true }
);

const Blog = model("Blog_", createSchema);

export default Blog;
