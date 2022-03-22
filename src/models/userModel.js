import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    email: { type:String, required:true, unique:true },
    password: { type:String, required:true },
    age:Number
}, { timestamps:true });

// timestamp 옵션은 처음 데이터를 생성했을 떄 createAt, 수정했을 때 updateAt 을 최신화

export default mongoose.model('User', userSchema);