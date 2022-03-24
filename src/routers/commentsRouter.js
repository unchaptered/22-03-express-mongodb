import express from "express";
import { getAllCommentsByBloggerId, deleteAllCommentByCommentIdAndOwenr } from "../controllers/commentsControllers.js";

const commentsRouter = express.Router();

commentsRouter.route("/")
    .get(getAllCommentsByBloggerId)
    .delete(deleteAllCommentByCommentIdAndOwenr);

export default commentsRouter;