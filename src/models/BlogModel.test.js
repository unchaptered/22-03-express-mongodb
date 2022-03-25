import BlogModel from "./BlogModel";
import UserModel from "./UserModel";

describe("BlogModel 은 Blog Document 모델입니다.", ()=>{

    test("BlogModel 은 3개의 필수값, 1개의 부모 연결, 1개의 자식연결을 가집니다.", ()=>{

        const email = "tester@gmail.com";
        const password = "password";

        const { _id } = new UserModel({ email, password });

        const title = "title";
        const content = "content";
        const islive = true;

        const blog = new BlogModel({ title, content, islive, owner: _id });

        expect(blog.title).toEqual(title);
        expect(blog.content).toEqual(content);
        expect(blog.islive).toEqual(islive);
        expect(blog.owner).toEqual(_id);
        expect(blog.comments.length).toEqual(0);
        
    });

});