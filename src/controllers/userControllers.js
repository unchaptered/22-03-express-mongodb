import mongoose from "mongoose";
import SendForm from "./SendForm.js";
import userModel from "../models/userModel.js"

/**
 * @param {*} req.body eamil, password
 * @param {*} res.status.json
 * @returns res.satus(statusCode).json(new SendForm());
 */
export const join = async (req, res) => {
    const sendForm = new SendForm();

    try{
        const user = new userModel(req.body);
        await user.save();

        sendForm.setText = "Join is success";
        sendForm.setSuccess = true;
        sendForm.setDatas = user;

        return res.status(200).json(sendForm);
    } catch (err) {
        sendForm.setText = "Join is failure";
        sendForm.setSuccess = false;
        sendForm.setErrorMessage = ""+err;

        return res.status(400).json(sendForm);
    }
}

/**
 * @param {*} req.body eamil, password
 * @param {*} res.status.json
 * @returns res.satus(statusCode).json(new SendForm());
 */
export const login = async (req, res) => {
    const sendForm = new SendForm();

    try{
        const user = await userModel.findOne({ ...req.body }).select("email");
        if (user === null) throw new Error("User is not finded or Password Mismatch");

        sendForm.setText = "Login is success";
        sendForm.setSuccess = true;
        sendForm.setDatas = user;

        return res.status(200).json(sendForm);
    } catch(err) {
        sendForm.setText = "Login is failure";
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
export const getUser = async (req, res) => {
    const sendForm = new SendForm();

    try {
        const user = await userModel.findById({ _id : req.params._id });

        sendForm.setText = "GetUser is success";
        sendForm.setSuccess = true;
        sendForm.setDatas = user;

        return res.status(200).json(sendForm);
    } catch(err) {
        sendForm.setText = "GetUser is failure";
        sendForm.setSuccess = false;
        sendForm.setErrorMessage = ""+err;

        return res.status(400).json(sendForm);
    }
}

/**
 * @param {*} req.params._id
 * @param {*} req.body before:{ email, password }, after: { passwordAfter }
 * @param {*} res.status.json
 * @returns res.satus(statusCode).json(new SendForm());
 */
export const updateUser = async (req, res) => {
    const sendForm = new SendForm();

    try {
        const {
            params: { _id },
            body: { before: { email, password }, after: { password:passwordAfter }}
        } = req;

        const user = await userModel.findByIdAndUpdate(_id , { password:passwordAfter });
        if (user === null) throw Error("The User is not Exists");

        sendForm.setText = "UpdateUser is success";
        sendForm.setSuccess = true;
        sendForm.setDatas = user;

        return res.status(200).json(sendForm);
    } catch(err) {
        sendForm.setText = "UpdateUser is failure";
        sendForm.setSuccess = false;
        sendForm.setErrorMessage = ""+err;

        return res.status(400).json(sendForm);
    }
};

/**
 * @param {*} req.params._id
 * @param {*} res.status.json
 * @returns res.satus(statusCode).json(new SendForm());
 */
export const deleteUser = async (req, res) => {
    const sendForm = new SendForm();

    try {
        /* findByIdAndDelete 메서드는
         *  삭제에 성공할 시, user 을 리턴한다.
         *  삭제에 실패할 시, null 을 리턴한다.
         * 
         * 따라서 null 이 리턴되었을 때는 "The User is not Exists" 에러를 통해,
         *  catch 문으로 넘기게 된다.
         */
        const user = await userModel.findByIdAndDelete({ _id: req.params._id });
        if (user === null) throw Error("The User is not Exists");

        sendForm.setText = "DeleteUser is success";
        sendForm.setSuccess = true;
        sendForm.setDatas = user;

        return res.status(200).json(sendForm);
    } catch(err) {

        sendForm.setText = "DeleteUser is failure";
        sendForm.setSuccess = false;
        sendForm.setErrorMessage = ""+err;

        return res.status(400).json(sendForm);
    }
};