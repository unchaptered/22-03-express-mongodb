import UserModel from "./UserModel";

describe("UserModel 은 User Document 모델입니다.", ()=>{
    
    test("UserModel 은 2개의 필수값, 1개의 선택값, 2개의 자식 연결을 가집니다.", ()=>{
        const email = "tester@gmail.com";
        const password = "password";

        const user = new UserModel({ email, password });

        expect(user.email).toEqual(email);
        expect(user.password).toEqual(password);
        expect(user.age).toEqual(undefined);

        expect(user.blogs.length).toEqual(0);
        expect(user.comments.length).toEqual(0);

    });

});