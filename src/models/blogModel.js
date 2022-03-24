import mongoose from "mongoose";

const blogSchema = new mongoose.Schema({
    title: { type:String, required:true },
    content: { type:String, required:true },
    islive: { type:Boolean, required:true, default:false },
    owner: { type: mongoose.Types.ObjectId, required:true, ref:"User" },

    comments: [{ type:mongoose.Types.ObjectId, required:true, ref:"Comment" }]
}, { timestamps:true });

// timestamp 옵션은 처음 데이터를 생성했을 떄 createAt, 수정했을 때 updateAt 을 최신화

export default mongoose.model("Blog", blogSchema);