import "dotenv/config";

import morgan from "morgan";
import express from "express";
import mongoose from "mongoose";

import UserModel from "./models/UserModel.js";
import BlogModel from "./models/BlogModel.js";
import CommentModel from "./models/CommentModel.js";

import userRouter from "./routers/userRouter.js";
import usersRouter from "./routers/usersRouter.js";

import blogRouter from "./routers/blogRouter.js";
import blogsRouter from "./routers/blogsRouter.js";

import commentRouter from "./routers/commentRouter.js";
import commentsRouter from "./routers/commentsRouter.js";

import fakeDataGenerator from "./sample/fakeDataGenerator.js";

const APP = express();

const server = async () => {
    try {
        APP.use(morgan("dev"));
        // MongoDB 연결
        let mongoConnection = await mongoose.connect(process.env.MONGO_URL);
        console.log("Server is connected to MongoDB Atlas");
        

        APP.use(express.urlencoded({ extended: false }));
        APP.use(express.json());
        
        APP.use("/user", userRouter);
        APP.use("/users", usersRouter);

        APP.use("/blog", blogRouter);
        APP.use("/blogs", blogsRouter);

        APP.use("/comment", commentRouter);
        APP.use("/comments", commentsRouter);

        APP.get("/:etc", (req, res) => {
            return res.send({
                message: `Client try to connect ${req.params.etc}`
            });
        })

        // TCP/IP Port 연결
        APP.listen(process.env.TCP_PORT, async () => {
            console.log(`Server is connected to TCP/IP PORT`);
            await fakeDataGenerator(30,40,50);
        });
        
    } catch (err) {
        console.error(err);
    }
}

server();

export default APP;