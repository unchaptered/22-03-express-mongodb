import SendForm from "./SendForm.js";

import userModel from "../models/userModel.js";
import blogModel from "../models/blogModel.js";
import commentModel from "../models/commentModel.js";

export const getAllCommentsByBloggerId = async (req, res) => {
    const sendForm = new SendForm();

    try {
        const { blogger } = req.body;

        const comments = await commentModel.find({ blogger });

        sendForm.setText = "Get All Comments (by blogger id) is success";
        sendForm.setSuccess = true;
        sendForm.setDatas = comments;

        return res.status(200).json(sendForm);
    } catch (err) {
        sendForm.setText = "Get All Comments (by blogger id) is failure";
        sendForm.setSuccess = false;
        sendForm.setErrorMessage = ""+err;

        return res.status(400).json(sendForm);
    }
}

export const deleteAllCommentByCommentIdAndOwenr = async (req, res) => {
    const sendForm = new SendForm();

    try {
        const { blogger } = req.body;

        const comments = await commentModel.find({ blogger });
        // console.log(comments);
        
        comments.forEach( async (value, key)=>{
            const { _id, owner, blogger } = value;

            const [ user, blog, comment ] = await Promise.all([
                userModel.findByIdAndUpdate(owner, { $pop: { comments:_id }}, { new:true }),
                blogModel.findByIdAndUpdate(blogger, { $pop: { comments:_id }}, { new:true }),
                commentModel.findByIdAndDelete(_id)
            ]);

            console.log(key, user, blog, comment);
        });

        // comments.forEach(value=>console.log(value.owner, value.blogger));

        sendForm.setText = "Delete All Comments (by blogger id) is success";
        sendForm.setSuccess = true;
        sendForm.setDatas = comments;

        return res.status(200).json(sendForm);
    } catch (err) {
        sendForm.setText = "Delete All Comments (by blogger id) is failure";
        sendForm.setSuccess = false;
        sendForm.setErrorMessage = ""+err;

        return res.status(400).json(sendForm);
    }
}