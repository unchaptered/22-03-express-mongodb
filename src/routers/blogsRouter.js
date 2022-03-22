import express from "express";
import { getBlogs } from "../controllers/blogsControllers.js";

const blogsRouter = express.Router();

blogsRouter.route("/")
    .get(getBlogs);

export default blogsRouter;