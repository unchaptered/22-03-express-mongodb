import mongoose from "mongoose";
import SendForm from "../base/SendForm.js";

import UserModel from "../models/UserModel.js";

/**
 * @param {*} req.body eamil, password
 * @param {*} res.status.json
 * @returns res.satus(statusCode).json(new SendForm());
 */
export const join = async (req, res) => {
    const sendForm = new SendForm();

    try{
        const user = new UserModel(req.body);
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
        const user = await UserModel.findOne({ ...req.body }).select("email");
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
 * @param {*} req.body._id
 * @param {*} res.status.json
 * @returns res.satus(statusCode).json(new SendForm());
 */
export const getUser = async (req, res) => {
    const sendForm = new SendForm();

    try {
        const { userId:_id } = req.body;

        const userIdFormat = mongoose.Types.ObjectId.isValid(_id);
        if (userIdFormat === false) new Error("The UserId is not ObjectId Format");

        const user = await UserModel.findById({ _id });
        if (user === null) new Error("The User is not Exists");

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
 * @param {*} req.body._id
 * @param {*} req.body.after.password
 * @param {*} res.status.json
 * @returns res.satus(statusCode).json(new SendForm());
 */
export const updateUser = async (req, res) => {
    const sendForm = new SendForm();

    try {
        const { userId:_id, after: { password } } = req.body;

        const userIdFormat = mongoose.Types.ObjectId.isValid(_id);
        if (userIdFormat === false) new Error("The UserId is not ObjectId Format");
        
        // 옵션 new 는 false 가 디폴트 값, 수정 전의 파일을 리턴.
        // 이 new 를 true 로 변경 하면, 수정 후의 파일을 리턴.
        
        const user = await UserModel.findByIdAndUpdate(_id, { password }, { new:true });

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
        const { userId:_id } =req.body;

        const userIdFormat = mongoose.Types.ObjectId.isValid(_id);
        if (userIdFormat === false) new Error("The UserId is not ObjectId Format");

        /* findByIdAndDelete 메서드는
         *  삭제에 성공할 시, user 을 리턴한다.
         *  삭제에 실패할 시, null 을 리턴한다.
         * 
         * 따라서 null 이 리턴되었을 때는 "The User is not Exists" 에러를 통해,
         *  catch 문으로 넘기게 된다.
         */
        const user = await UserModel.findByIdAndDelete(_id);

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