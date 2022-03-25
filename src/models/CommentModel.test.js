import BlogModel from "./BlogModel";
import UserModel from "./UserModel";
import CommentModel from "./CommentModel";

describe("CommentModel 은 Comment Document 모델입니다.", ()=>{

    test("CommentModel 은 1개의 필수값, 2개의 부모 연결을 가집니다.", ()=>{

        const email = "tester@gmail.com";
        const password = "password";

        const { _id: owner } = new UserModel({ email, password });

        const title = "title";
        const content = "content";
        const islive = true;

        const { _id: blogger } = new BlogModel({ title, content, islive, owner });

        const content2 = "comment";

        const comment = new CommentModel({ content: content2, blogger, owner });

        expect(comment.content).toEqual(content2);
        expect(comment.blogger).toEqual(blogger);
        expect(comment.owner).toEqual(owner);
        
    });

});