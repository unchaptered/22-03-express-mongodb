import SendForm from "./SendForm.js";
import blogModel from "../models/blogModel.js";
import userModel from "../models/userModel.js";

import { checkObjectId, checkUserObjectId } from "../middlewares/middlewares.js";

/**
 * 
 * @param {*} req.body userId, title, content, islive
 * @param {*} res.status.json
 * @returns res.status(statusCode).json(new SendForm());
 */
export const postBlog = async (req, res) => {
    const sendForm = new SendForm();

    try {
        const { userId, ...blogForm } = req.body;
        checkUserObjectId(userId);

        const user = await userModel.findById({ _id:userId });
        if(user === null || user === undefined) new Error("The User is not Exists");

        // user 와 userId 뭘 넘겨줘도 ok
        // const blog = new blogModel({ ...blogForm, userId });
        const blog = new blogModel({ ...blogForm, owner:user });
        await blog.save();

        sendForm.setText = "Postblog is success";
        sendForm.setSuccess = true;
        sendForm.setDatas = blog;

        return res.status(200).json(sendForm);
    } catch (err) {
        
        sendForm.setText = "Postblog is failure";
        sendForm.setSuccess = false;
        sendForm.setErrorMessage = ""+err;

        return res.status(400).json(sendForm);
    }
}

/**
 * @param {*} req.params._id
 * @param {*} res.status.json
 * @returns res.satus(statusCode).json(new SendForm());
 */
export const getBlog = async (req, res) => {
    const sendForm = new SendForm();

    try {
        const { _blogId:_id } = req.params;
        checkObjectId(_id);
        
        const blog = await blogModel.findById({ _id }).populate("owner");
        if(blog === null || blog === undefined) new Error("The Blog is not Exists");

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
 * @param {*} req.body title,content, islive
 * @param {*} res.status.json
 * @returns res.satus(statusCode).json(new SendForm());
 */
export const patchBlog = async (req, res) => {
    const sendForm = new SendForm();

    try {
        const {
            params: { _blogId: _id },
            body: { title, content, islive }
        } = req;
        checkObjectId(_id);
        if (title === undefined || typeof title !== String)
            new TypeError("Title can't be undefined And must be String");

        if (content === undefined || typeof content !== String)
            new TypeError("Title can't be undefined And must be String");

        if (typeof islive !== Boolean)
            new TypeError("Title must be Boolean");
        
        const blog = await blogModel.findByIdAndUpdate( _id, { ... req.body }, { new: true });
        if(blog === null || blog === undefined) new Error("The Blog is not Exists");

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
        const { _blogId:_id } = req.params;
        checkObjectId(_id);
        
        const blog = await blogModel.findByIdAndDelete({ _id });
        if(blog === null || blog === undefined) new Error("The Blog is not Exists");

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