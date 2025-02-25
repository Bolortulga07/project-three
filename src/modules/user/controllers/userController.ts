import { Request, Response } from "express";
import { AuthRequest } from "../../../index";
import { User } from "../../../index";
import { Users } from "../../../db/models/users";

export const getToken = async (req: Request, res: Response) => {
  const { email } = req.body;

  try {
    const user = await Users.findOne({ email });
  } catch (e) {
    res.send({
      error: e instanceof Error ? e.message : "An unknown error occurred",
    });
  }
};

export const myProfile = async (req: AuthRequest, res: Response) => {
  try {
    const { userId } = req.user || ({} as User);

    const user = await Users.find({ _id: userId });

    res.send(user);
  } catch (e) {
    res.send({
      error: e instanceof Error ? e.message : "An unknown error occurred",
    });
  }
};

export const others = async (req: Request, res: Response) => {
  const { username } = req.query;

  try {
    const user = await Users.find({ username: { $ne: username } });
    res.send(user);
  } catch (e) {
    res.send({
      error: e instanceof Error ? e.message : "An unknown error occurred",
    });
  }
};

export const othersProfile = async (req: AuthRequest, res: Response) => {
  const { userId } = req.user || ({} as User);

  try {
    const user = await Users.findOne({ _id: userId });
    res.send(user);
  } catch (e) {
    res.send({
      error: e instanceof Error ? e.message : "An unknown error occurred",
    });
  }
};

export const updateDetail = async (req: AuthRequest, res: Response) => {
  const { email, username } = req.body;
  const { userId } = req.user || ({} as User);
  try {
    const user = await Users.findOneAndUpdate(
      { _id: userId },
      { $set: { email, username } },
      { new: true, runValidators: true }
    );
    res.send(user);
  } catch (e) {
    res.send({
      error: e instanceof Error ? e.message : "An unknown error occurred",
    });
  }
};
