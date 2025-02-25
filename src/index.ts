import express, { request } from "express";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import mongoose from "mongoose";
import { Request, Response, NextFunction } from "express";
import { authRoutes } from "./modules/auth/routes/authRoutes";
import { userRoutes } from "./modules/user/routes/userRoutes";
import { blogRoutes } from "./modules/blog/routes/blogRoutes";
import { commentRoutes } from "./modules/comment/routes/commentRoutes";

dotenv.config();

mongoose.connect(process.env.MONGO_URL as string).then(() => {
  console.log("connected to MONGO");
});

const app = express();
app.use(express.json());

export interface User {
  userId: string;
}

export interface AuthRequest extends Request {
  user?: User;
}

const authMiddleware = (
  req: AuthRequest,
  res: Response,
  next: NextFunction
) => {
  const authHeader = req.headers["authorization"] || "";

  const token = authHeader.split(" ")[1];

  const user = jwt.verify(token, process.env.SECRET_KEY as string);

  req.user = user as User;

  next();
};

app.use("/", authRoutes);
app.use("/user", authMiddleware, userRoutes);
app.use("/blogs", authMiddleware, blogRoutes);
app.use("/comment", authMiddleware, commentRoutes);

app.listen(3000, () => {
  console.log("app running on 3000");
});
