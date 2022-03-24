import SendForm from "../base/SendForm.js";

import UserModel from "../models/UserModel.js";

/**queryString 으로 limit 받아서 사용한다. (기본값 3)
 * 
 * @param {*} req.query.limit
 * @param {*} res 
 * @returns res.satus(statusCode).json(new SendForm());
 */
export const getUsers = async (req, res) => {
    const sendForm = new SendForm();

    try {
        const { limit=3 } = req.body;
        
        const users = await UserModel.find().limit(+limit);
        if (users.length === 0) new Error("No User in server");
        
        sendForm.setText = "GetUser is success";
        sendForm.setSuccess = true;
        sendForm.setDatas = users;

        return res.status(200).json(sendForm);
    } catch(err) {
        sendForm.setText = "GetUser is failure";
        sendForm.setSuccess = false;
        sendForm.setErrorMessage = ""+err;

        return res.status(400).json(sendForm);
    }
}