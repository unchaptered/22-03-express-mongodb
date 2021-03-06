import express from "express";
import { postBlog, getBlog, patchBlog, deleteBlog } from "../controllers/blogControllers.js";

const blogRouter = express.Router();

blogRouter.route("/")
    .post(postBlog);

blogRouter.route("/detail")
    .get(getBlog)
    .patch(patchBlog)
    .delete(deleteBlog);

export default blogRouter;