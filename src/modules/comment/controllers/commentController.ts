import { Request, Response } from "express";
import { AuthRequest } from "../../../index";
import { User } from "../../../index";
import { Comments } from "../../../db/models/comment";

export const createComment = async (req: AuthRequest, res: Response) => {
  try {
    const { content, parentId } = req.body;
    const { blogId } = req.params;
    const { userId } = req.user || ({} as User);

    const doc = {
      blogId,
      userId,
      content,
      parentId,
    };

    if (parentId) {
      doc.parentId = parentId;
    }

    await Comments.create(doc);

    res.send("comment posted.");
  } catch (e) {
    res.send({
      error: e instanceof Error ? e.message : "An unknown message occured.",
    });
  }
};

export const getReply = async (req: AuthRequest, res: Response) => {
  try {
    const { parentId } = req.query;
    const reply = Comments.find({ parentId });
    res.send(reply);
  } catch (e) {
    res.send({
      error: e instanceof Error ? e.message : "An unknown message occured.",
    });
  }
};

export const getComment = async (req: Request, res: Response) => {
  const { blogId } = req.params;
  const { sort } = req.query;

  const sortedNumber = typeof sort === "string" ? Number(sort) : 1;

  try {
    const comment = await Comments.find({ blogId }).sort({
      createdAt: sortedNumber || "desc" ? "desc" : "asc",
    });

    res.send(comment);
  } catch (e) {
    res.send({
      error: e instanceof Error ? e.message : "An unknown message occured.",
    });
  }
};

export const deleteComment = async (req: Request, res: Response) => {
  const { commentId } = req.params;
  try {
    const comment = await Comments.findByIdAndDelete({ _id: commentId });
    res.send("comment deleted.");
  } catch (e) {
    res.send({
      error: e instanceof Error ? e.message : "An unknown message occured.",
    });
  }
};
