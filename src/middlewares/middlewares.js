import mongoose from "mongoose";

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
export const checkObjectId = async (_id) =>{
    if (_id === undefined) {
        return new Error("We need req.params._id");
    } else if (!ObjectId.isValid(_id)) {
        return new Error("This ObjectId(_id) is not exists");
    }
}

export const checkUserObjectId = async (userId) => {
    if (userId === undefined) {
        return new Error("We need req.body.userId");
    } else if (!ObjectId.isValid(userId)) {
        return new Error("This ObjectId(userId) is not exists");
    }
}