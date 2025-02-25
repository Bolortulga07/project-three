import express from "express";
import {
  createComment,
  deleteComment,
  getComment,
  getReply,
} from "../controllers/commentController";

export const commentRoutes = express.Router();

commentRoutes.post("/:blogId", createComment);

commentRoutes.get("/:blogId", getComment);

commentRoutes.delete("/:commentId", deleteComment);

commentRoutes.get("/reply", getReply);
