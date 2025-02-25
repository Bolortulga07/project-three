import express from "express";

import {
  getToken,
  myProfile,
  others,
  othersProfile,
  updateDetail,
} from "../controllers/userController";

export const userRoutes = express.Router();

userRoutes.get("/get-token", getToken);

userRoutes.get("/profile", myProfile);

userRoutes.get("/others", others);

userRoutes.get("/profile/:userId", othersProfile);

userRoutes.put("/", updateDetail);
