import mongoose, { Model } from "mongoose";
import { blogSchema } from "../schemas/blogSchema";
import { User } from "../../modules/blog/controllers/blogController";

interface IBlog {
  title: string;
  description: string;
  content: string;
  userId: User;
}

interface blogModel extends Model<IBlog> {
  createBlog(data: IBlog): Promise<IBlog>;
}

class Blog {
  static async createBlog(this: blogModel, data: IBlog): Promise<IBlog> {
    return this.create(data);
  }
}

blogSchema.loadClass(Blog);

export const Blogs = mongoose.model("Blogs", blogSchema);
