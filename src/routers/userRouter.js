import express from "express";

import { checkObjectId } from "../middlewares/middlewares.js";

import { login, join, getUser, updateUser, deleteUser } from "../controllers/userControllers.js";

const userRouter = express.Router();

userRouter.route("/")
    .get(login)
    .post(join);

userRouter.route("/:_id")
    .all(checkObjectId)
    .get(getUser)
    .put(updateUser)
    .delete(deleteUser);

export default userRouter;