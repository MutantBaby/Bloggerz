import { Schema, model } from "mongoose";

const commentSchema = new Schema(
  {
    body: {
      type: String,
      required: true,
    },
    author: {
      type: Schema.Types.ObjectId,
      ref: "Author_",
      required: true,
    },
    blog: {
      type: Schema.Types.ObjectId,
      ref: "Blog_",
      required: true,
    },
  },
  { timestamps: true }
);

const Comment = model("Comment_", commentSchema);

export default Comment;
