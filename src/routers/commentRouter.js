import express from "express";
import { getComment, patchComment, postComment, deleteComment } from "../controllers/commentControllers.js";

const commentRouter = express.Router();

commentRouter.route("/")
    .get(getComment)
    .post(postComment)
    .patch(patchComment)
    .delete(deleteComment);

export default commentRouter;