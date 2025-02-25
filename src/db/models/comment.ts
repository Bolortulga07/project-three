import mongoose from "mongoose";

import { commentSchema } from "../schemas/commentSchema";

export const Comments = mongoose.model("Comments", commentSchema);
