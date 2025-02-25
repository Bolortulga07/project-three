import express from "express";
import {
  createBlog,
  deleteBlog,
  detail,
  getBlog,
  profile,
} from "../controllers/blogController";

export const blogRoutes = express.Router();

blogRoutes.post("/", createBlog);
blogRoutes.put("/:blogId", getBlog);
blogRoutes.get("/me", profile);
blogRoutes.get("/detail/:blogId", detail);
blogRoutes.delete("/:blogId", deleteBlog);
