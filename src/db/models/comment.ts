import mongoose, { Model, Document, Schema } from "mongoose";
import { User } from "../../modules/blog/controllers/blogController";
import { blogSchema } from "../schemas/blogSchema";
import { commentSchema } from "../schemas/commentSchema";

interface IComment extends Document {
  userId: User;
  blogId: typeof blogSchema;
  content: string;
  parentId?: string;
}

interface CommentModel extends Model<IComment> {
  createComment(data: IComment): Promise<IComment>;
  deleteComment(commentId: string): Promise<IComment | null>;
  updateComment(
    commentId: string,
    newContent: string
  ): Promise<IComment | null>;
}

class CommentClass {
  static async createComment(
    this: CommentModel,
    data: IComment
  ): Promise<IComment> {
    const comment = new this(data);
    return await comment.save();
  }

  static async deleteComment(
    this: CommentModel,
    commentId: string
  ): Promise<IComment | null> {
    return this.findByIdAndDelete(commentId);
  }

  static async updateComment(
    this: CommentModel,
    commentId: string,
    newContent: string
  ): Promise<IComment | null> {
    return this.findByIdAndUpdate(
      commentId,
      { content: newContent },
      { new: true }
    );
  }

  static async getReplies(
    this: CommentModel,
    parentId: string
  ): Promise<IComment[]> {
    return this.find({ parentId });
  }
}

commentSchema.loadClass(CommentClass);

export const Comment = mongoose.model("Comments", commentSchema);
