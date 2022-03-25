import SendForm from "./SendForm";

describe("SendForm 은 response 대응 클래스입니다.", ()=>{

    describe("SendForm 의 모든 필드는 기본값을 가집니다.", ()=>{

        test("Check : constructor()", ()=>{
            
            const sendForm = new SendForm();

            expect(sendForm.success).toBeFalsy();
            expect(sendForm.message).toBeNull();
            expect(sendForm.errorMessage).toBeNull();
            expect(Object.keys(sendForm.datas).length).toBe(0);

        });
    });
    describe("SendForm 은 TypeError() 를 일으킬 수 있습니다.", ()=>{
        test("Check : get, set success", ()=>{

            const sendForm = new SendForm();

            sendForm.setSuccess = true;
            expect(sendForm.getSuccess).toBeTruthy();

            sendForm.setMessage = "result message";
            expect(sendForm.getMessage).toBe("result message");

            const error = new Error("error message");
            sendForm.setErrorMessage = "" + error;
            expect(sendForm.getErrorMessage).toBe("Error: error message");

            const user =  { user: { username: "unchaptered" }};
            sendForm.setDatas = user;
            expect(Object.keys(sendForm.getDatas).length).toBe(1);
            expect(sendForm.getDatas).toEqual(user);
        });

        test("Check : get, set failure", ()=>{

            const sendForm = new SendForm();

            try {
                sendForm.setDatas = 123;
            } catch(err) {
                expect(err).toEqual(new TypeError("Parameter is not object"));
                expect(Object.keys(sendForm.getDatas).length).toBe(0);
            }

            try {
                sendForm.setSuccess = 123;
            } catch(err) {
                expect(err).toEqual(new TypeError("Parameter is not boolean"));
                expect(sendForm.getSuccess).toBeFalsy();
            }

            try {
                sendForm.setMessage = 123;
            } catch(err) {
                expect(err).toEqual(new TypeError("Parameter is not string"));
                expect(sendForm.getMessage).toBeNull();
            }

            try {
                sendForm.setErrorMessage = 123;
            } catch(err) {
                expect(err).toEqual(new TypeError("Parameter is not string"));
                expect(sendForm.getErrorMessage).toBeNull();
            }
        })
    })
})