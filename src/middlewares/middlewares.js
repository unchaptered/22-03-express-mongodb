import mongoose from "mongoose";

import userModel from "../models/userModel.js";

import SendForm from "../controllers/SendForm.js";

const { ObjectId } = mongoose.Types;

/**req.params._id 가 유효하지 않으면, Error() 를 던지고, 아니면 다음 프로세스를 실행한다.
 * 
 * @throws Error("This ObjectId is not exists");
 * @link https://minhanpark.github.io/today-i-learned/check-mongoose-objectid/
 * @param {*} req.params._id
 * @param {*} res 
 * @param {*} next 
 * @returns next()
 */
export const checkObjectId = async (req, res, next) =>{
    if (!ObjectId.isValid(req.params._id)) throw Error("This ObjectId is not exists");

    return next();
}