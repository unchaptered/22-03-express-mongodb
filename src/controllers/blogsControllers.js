import SendForm from "./SendForm.js";
import blogModel from "../models/blogModel.js";

/**queryString 으로 limit 받아서 사용한다. (기본값 3)
 * 
 * @param {*} req 
 * @param {*} res 
 * @returns res.status(statusCode).json(new SendForm());
 */
export const getBlogs = async (req, res) => {
    const sendForm = new SendForm();

    try {
        const { limit=3 } = req.query;
        const blogs = await blogModel.find().limit(limit);
        if (blogs.length === 0) new Error("No User in server");
        
        sendForm.setText = "GetUser is success";
        sendForm.setSuccess = true;
        sendForm.setDatas = blogs;

        return res.status(200).json(sendForm);
    } catch(err) {
        sendForm.setText = "GetUser is failure";
        sendForm.setSuccess = false;
        sendForm.setErrorMessage = ""+err;

        return res.status(400).json(sendForm);
    }
}