import { Request, Response } from "express";
import { Users } from "../../../db/models/users";

export const register = async (req: Request, res: Response) => {
  try {
    const { username, password, email } = req.body;

    const user = await Users.register({ username, email, password });
    const token = user.getToken();

    res.send(token);
  } catch (e) {
    res.send({
      error: e instanceof Error ? e.message : "An unknown message occured.",
    });
  }
};

export const login = async (req: Request, res: Response) => {
  const { password, email } = req.body;

  try {
    const token = await Users.login({ email, password });

    res.send(token);
  } catch (e) {
    res.send({
      error: e instanceof Error ? e.message : "An unknown message occured.",
    });
  }
};
