import mongoose, { Schema } from "mongoose";

const schema = mongoose.Schema;

export const blogSchema = new schema(
  {
    title: {
      type: String,
      required: true,
      trim: true,
    },
    description: {
      type: String,
    },
    content: {
      type: String,
      required: true,
    },
    userId: {
      type: String,
      required: true,
      ref: "Users",
    },
  },
  { timestamps: true }
);
