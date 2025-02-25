import express, { request } from "express";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import mongoose from "mongoose";
import { Request, Response, NextFunction } from "express";

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
  const authHeader = req.headers["authorization"];

  if (!authHeader) {
    return res.send("Token!!");
  }

  const token = authHeader.split(" ")[1];

  try {
    const user = jwt.verify(token, process.env.SECRET_KEY as string);

    req.user = user as User;

    next();
  } catch (e) {
    res.send("Auth token invalid");
  }
};
