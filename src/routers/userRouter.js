import express from "express";

import { login, join, getUser, updateUser, deleteUser } from "../controllers/userControllers.js";

const userRouter = express.Router();

userRouter.route("/")
    .get(login)
    .post(join);

userRouter.route("/:_id")
    .get(getUser)
    .put(updateUser)
    .delete(deleteUser);

export default userRouter;