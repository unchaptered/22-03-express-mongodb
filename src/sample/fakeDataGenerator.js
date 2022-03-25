import faker from "faker";
import { rando } from "@nastyox/rando.js";

import UserModel from "../models/UserModel.js";
import BlogModel from "../models/BlogModel.js";
import CommentModel from "../models/CommentModel.js";

export const TypeChecker = (targetName, targetValue) => {
    if (typeof targetValue !== "number") {
        console.error(`Denied ${targetName} : ${targetValue} is not number`);
        return -1;
    }
    return 0;
}

export const NumberChecker = (targetName, targetValue) => {
    if (targetValue < 1) {
        console.error(`Denied ${targetName} : ${targetValue} is not positive number`);
        return -1;
    }
    return 0;
}

/** 가상 데이터 생성용 함수로, User, Blog, CommentModel 의 Document 가 한개도 없으면 실행된다.
 */
export default  async (maxUser, maxBlog, maxComment) => {
    const startingMessage = "\n=================Fake Data Process=================\n";
    const endingMessage =   "\n====================End Process====================\n";
    console.log(startingMessage);

    let flag = false;
    flag += TypeChecker("USER", maxUser);
    flag += TypeChecker("BLOG", maxBlog);
    flag += TypeChecker("COMMENT", maxComment);
    flag += NumberChecker("USER", maxUser);
    flag += NumberChecker("BLOG", maxBlog);
    flag += NumberChecker("COMMENT", maxComment);

    if (flag < 0) {
        console.error(`Denied Validation : you give me ${flag} wrong parameters`);
        return console.log(endingMessage);
    } else {
        console.log(`Access Validation : you give me right parameters`);
    };

    const [ userExists, blogExists, commentExists ] =await Promise.all([
        UserModel.find({}).limit(1),
        BlogModel.find({}).limit(1),
        CommentModel.find({}).limit(1)
    ])

    if (userExists.length > 0 || blogExists > 0 || commentExists > 0 ){
        console.error("Denied Process : fake data is already exists");
        return console.log(endingMessage);
    } else {
        console.log(`Access Process : fake data is making now`);
    }

    const users = [];
    for (let index = 0; index < maxUser; index++) {
        users.push ( new UserModel (
            { email: faker.internet.email(), password: faker.internet.password() }
        ));
    }

    const blogs = [];
    const comments = [];
    for (let index = 0; index < maxBlog ; index++) {
        // npm i @nastyox/rando.js@2.0.5
        // npm https://www.npmjs.com/package/@nastyox/rando.js
        // github https://github.com/nastyox/Rando.js
        const maxOfUser = Math.min(index, users.length - 1);
        const randOfUser = rando(1, maxOfUser);
        const user = users[randOfUser]; // 참조
        const blog =  new BlogModel({
            title: faker.lorem.words(), content: faker.lorem.text(),
            islive: true, owner:user._id
        });

        user.blogs.push(blog._id);
        blogs.push(blog);
    }

    for (let index = 0; index < maxComment ; index++) {
        const maxOfUser = Math.min(index, users.length - 1);
        const randOfUser = rando(1, maxOfUser);
        const user = users[randOfUser]; // 참조
        
        const maxOfBlog = Math.min(index, blogs.length - 1);
        const randOfBlog = rando(1, maxOfBlog);
        const blog = blogs[randOfBlog]; // 참조

        const comment = new CommentModel({
            content: faker.lorem.sentence(), owner:user._id, blogger: blog._id
        });

        user.comments.push(comment._id);
        blog.comments.push(comment._id);
        comments.push(comment);
    }

    let userList = null;
    let blogList = null;
    let commentList = null;

    try {
        const [ usreListInDB, blogListInDB, commentListInDB ]= await Promise.all([
            UserModel.insertMany(users),
            BlogModel.insertMany(blogs),
            CommentModel.insertMany(comments)
        ])

        userList = usreListInDB;
        blogList = blogListInDB;
        commentList = commentListInDB;

    } catch (err) {
        console.error("Collide Process : "+err);
        return console.log(endingMessage);
    }

    console.log(`Finshed Process : ${userList.length} user ${blogList.length} blog ${commentList.length} comments`);
    return console.log(endingMessage);
};