import mongoose from "mongoose";

import { blogSchema } from "../schemas/blogSchema";

export const Blogs = mongoose.model("Blogs", blogSchema);
