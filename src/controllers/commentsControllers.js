import SendForm from "../base/SendForm.js";

import UserModel from "../models/UserModel.js";
import BlogModel from "../models/BlogModel.js";
import CommentModel from "../models/CommentModel.js";

export const getAllCommentsByBloggerId = async (req, res) => {
    const sendForm = new SendForm();

    try {
        const { blogger } = req.body;

        const comments = await CommentModel.find({ blogger });

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

        const comments = await CommentModel.find({ blogger });
        // console.log(comments);
        
        comments.forEach( async (value, key)=>{
            const { _id, owner, blogger } = value;

            const [ user, blog, comment ] = await Promise.all([
                UserModel.findByIdAndUpdate(owner, { $pop: { comments:_id }}, { new:true }),
                BlogModel.findByIdAndUpdate(blogger, { $pop: { comments:_id }}, { new:true }),
                CommentModel.findByIdAndDelete(_id)
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