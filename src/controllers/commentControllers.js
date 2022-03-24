import mongoose from "mongoose";

import SendForm from "./SendForm.js";

import userModel from "../models/userModel.js";
import blogModel from "../models/blogModel.js";
import commentModel from "../models/commentModel.js";

export const getComment = async (req, res) => {
    const sendForm = new SendForm();

    try {
        const { _id } = req.body;

        // Read Comment

        const comment = await commentModel.findById(_id);
        if (comment === null) new Error("The Comment is not Exists");

        sendForm.setText = "getComment is success";
        sendForm.setSuccess = true;
        sendForm.setDatas = comment;

        return res.status(200).json(sendForm);
    } catch (err) {
        sendForm.setText = "getComment is failure";
        sendForm.setSuccess = false;
        sendForm.setErrorMessage = ""+err;

        return res.status(400).json(sendForm);
    }
}

export const postComment = async (req, res) => {
    const sendForm = new SendForm();

    try {
        const { owner, blogger, content } = req.body;

        // Exists Validator

        const [ userExists, blogExists ] = await Promise.all([
            mongoose.Types.ObjectId.isValid(owner),
            mongoose.Types.ObjectId.isValid(blogger)
        ]);
        if (userExists === false) new Error("The User is not Exists");
        if (blogExists === false) new Error("The Blog is not Exists");

        // Create Comment
        
        const comment = new commentModel(req.body);
        const [ user, blog ] = await Promise.all([
           userModel.findByIdAndUpdate(owner, {$push: { comments:comment._id }} ),
           blogModel.findByIdAndUpdate(blogger, {$push: { comments:comment._id }} ),
           comment.save()
        ]);

        sendForm.setText = "postComment is success";
        sendForm.setSuccess = true;
        sendForm.setDatas = { user, blog, comment };

        return res.status(200).json(sendForm);
    } catch (err) {
        sendForm.setText = "postComment is failure";
        sendForm.setSuccess = false;
        sendForm.setErrorMessage = ""+err;

        return res.status(400).json(sendForm);
    }
}

export const patchComment = async (req, res) => {
    const sendForm = new SendForm();

    try {
        const { _id, content } = req.body;

        // Update Comemnt

        const comment = await commentModel.findByIdAndUpdate(_id, { content }, { new:true });
        if (comment === null) new Error("The Comment is not Exists");

        sendForm.setText = "patchComment is success";
        sendForm.setSuccess = true;
        sendForm.setDatas = comment;

        return res.status(200).json(sendForm);
    } catch (err) {
        sendForm.setText = "patchComment is failure";
        sendForm.setSuccess = false;
        sendForm.setErrorMessage = ""+err;

        return res.status(400).json(sendForm);
    }
}

export const deleteComment = async (req, res) => {
    const sendForm = new SendForm();

    try {
        const { owner, blogger, _id } = req.body;

        // Exists Validators

        const [ userExists, blogExists, commentExists ] = await Promise.all([
            mongoose.Types.ObjectId.isValid(owner),
            mongoose.Types.ObjectId.isValid(blogger),
            mongoose.Types.ObjectId.isValid(_id)
        ]);
        if (userExists === false) new Error("The User is not Exists");
        if (blogExists === false) new Error("The Blog is not Exists");
        if (commentExists === false) new Error("The Comment is not Exists");

        // Delete Comment

        const [ user, blog, comment ] = await Promise.all([
            userModel.findByIdAndUpdate(owner, { $pop: { comments:_id }}, { new:true }),
            blogModel.findByIdAndUpdate(blogger, { $pop: { comments:_id }}, { new:true }),
            commentModel.findByIdAndDelete(_id)
        ]);
        
        sendForm.setText = "deleteComment is success";
        sendForm.setSuccess = true;
        sendForm.setDatas = { user, blog, comment };

        return res.status(200).json(sendForm);
    } catch (err) {
        
        sendForm.setText = "deleteComment is failure";
        sendForm.setSuccess = false;
        sendForm.setErrorMessage = ""+err;

        return res.status(400).json(sendForm);
    }
}

