import mongoose from "mongoose";

const commentSchema = new mongoose.Schema({
    content: { type:String, required:true },
    blogger: { type:mongoose.Types.ObjectId, required:true, ref:"Blog" },
    owner: { type:mongoose.Types.ObjectId, required:true, ref:"User" }
}, { timestamps:true });

// timestamp 옵션은 처음 데이터를 생성했을 떄 createAt, 수정했을 때 updateAt 을 최신화

export default mongoose.model("Comment", commentSchema);