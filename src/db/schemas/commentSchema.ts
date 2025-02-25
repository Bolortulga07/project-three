import mongoose, { Schema } from "mongoose";

const schema = mongoose.Schema;

export const commentSchema = new schema(
  {
    userId: {
      type: String,
      required: true,
      ref: "Users",
    },
    blogId: {
      type: String,
      required: true,
      ref: "Blogs",
    },
    content: {
      type: String,
    },
    parentId: {
      type: String,
      unique: true,
    },
  },
  { timestamps: true }
);
