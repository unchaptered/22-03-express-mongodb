import mongoose from "mongoose";

import SendForm from "../base/SendForm.js";

import UserModel from "../models/UserModel.js";
import BlogModel from "../models/BlogModel.js";

/**
 * @param {*} req.params._id
 * @param {*} res.status.json
 * @returns res.satus(statusCode).json(new SendForm());
 */
export const getBlog = async (req, res) => {
    const sendForm = new SendForm();

    try {
        const { blogId:_id } = req.body;

        const blogIdFormat = mongoose.Types.ObjectId.isValid(_id);
        if (blogIdFormat === false) new Error("The BlogId is not ObjectId Format");

        const blog = await BlogModel.findById(_id);
        if (blog === null) new Error("The Blog is not Exists");
        
        sendForm.setText = "GetBlog is success";
        sendForm.setSuccess = true;
        sendForm.setDatas = blog;

        return res.status(200).json(sendForm);
    } catch (err) {
        sendForm.setText = "GetBlog is failure";
        sendForm.setSuccess = false;
        sendForm.setErrorMessage = ""+err;

        return res.status(400).json(sendForm);
    }
}

/**
 * 
 * @param {*} req.body userId, title, content, islive
 * @param {*} res.status.json
 * @returns res.status(statusCode).json(new SendForm());
 */
export const postBlog = async (req, res) => {
    const sendForm = new SendForm();

    console.log("실행");
    try {
        const { userId, ...blogForm } = req.body;

        const userIdFormat = mongoose.Types.ObjectId.isValid(userId);
        if (userIdFormat === false) new Error("The UserId is not ObjectId Format");

        const blog = new BlogModel({ ...blogForm, owner:userId });

        const [ user, _ ] = await Promise.all([
            UserModel.findByIdAndUpdate(userId, { $push: { blogs:blog._id } }, { new:true }),
            blog.save()
        ]);

        sendForm.setText = "Postblog is success";
        sendForm.setSuccess = true;
        sendForm.setDatas = { user, blog };

        return res.status(200).json(sendForm);
    } catch (err) {
        
        sendForm.setText = "Postblog is failure";
        sendForm.setSuccess = false;
        sendForm.setErrorMessage = ""+err;

        return res.status(400).json(sendForm);
    }
}



/**
 * @param {*} req.params._blogId
 * @param {*} req.body title,content, islive
 * @param {*} res.status.json
 * @returns res.satus(statusCode).json(new SendForm());
 */
export const patchBlog = async (req, res) => {
    const sendForm = new SendForm();

    try {
        const { blogId: _id, title, content } = req.body;

        const blogIdFormat = mongoose.Types.ObjectId.isValid(_id);
        if (blogIdFormat === false) new Error("The BlogId is not ObjectId Format");

        let blog = null;
        if (title === undefined) {
            if (content === undefined) { // 내용만 변경
                new Error("No Changes in json");
            } else { // 둘 다 변경
                blog = await BlogModel.findByIdAndUpdate(_id, { content }, { new:true });
            }
        } else {
            if (content === undefined) { // 제목만 변경
                blog = await BlogModel.findByIdAndUpdate(_id, { title }, { new:true });
            } else { // 그 어떤 값도 넘어오지 않음
                blog = await BlogModel.findByIdAndUpdate(_id, { title, content }, { new:true });
            }
        }

        if(blog === null) new Error("The Blog is not Exists");

        sendForm.setText = "GetBlog is success";
        sendForm.setSuccess = true;
        sendForm.setDatas = blog;

        return res.status(200).json(sendForm);
    } catch (err) {
        sendForm.setText = "GetBlog is failure";
        sendForm.setSuccess = false;
        sendForm.setErrorMessage = ""+err;

        return res.status(400).json(sendForm);
    }
}

/**
 * @param {*} req.params._blogId
 * @param {*} res.status.json
 * @returns res.satus(statusCode).json(new SendForm());
 */
export const deleteBlog = async (req, res) => {
    const sendForm = new SendForm();

    try {
        const { blogId:_id } = req.params;

        const blogIdFormat = mongoose.Types.ObjectId.isValid(_id);
        if (blogIdFormat === false) new Error("The BlogId is not ObjectId Format");

        const blog = await BlogModel.findByIdAndDelete(_id);
        if(blog === null) new Error("The Blog is not Exists");
        console.log(blog);
        sendForm.setText = "GetBlog is success";
        sendForm.setSuccess = true;
        sendForm.setDatas = blog;

        return res.status(200).json(sendForm);
    } catch (err) {
        sendForm.setText = "GetBlog is failure";
        sendForm.setSuccess = false;
        sendForm.setErrorMessage = ""+err;

        return res.status(400).json(sendForm);
    }
}