/**데이터 반황 양식 클래스
 * 
 * **success** 성공여부
 * 
 * **message** 시스템 메세지
 * 
 * **errorMessage** 에러 메세지(catch)
 * 
 * **datas** 반환 데이터
 */
export default class SendForm {

    // Field Variables

    success = false;
    message = null;
    errorMessage = null;
    datas = new Object();

    // Empty Variables for reset to Field Varaibles

    // static emptyText = new String();
    // static emptyArray = new Array();
    // static emptyObject = new Object();

    constructor () {}

    // Validators

    static booleanValid(success) {
        return typeof success === "boolean";
    }
    static stringValid(message) {
        return typeof message === "string";
    }
    static objectValid(datas) {
        return typeof datas === "object";
    }

    // Getters

    get getSuccess() {
        return this.success;
    }
    get getMessage() {
        return this.message;
    }
    get getErrorMessage() {
        return this.errorMessage;
    }
    get getDatas() {
        return this.datas;
    }

    // Setters

    set setSuccess(success) {
        if (!SendForm.booleanValid(success)) throw TypeError("Parameter is not boolean");
        
        return this.success = success;
    }

    set setMessage(message) {
        if (!SendForm.stringValid(message)) throw TypeError("Parameter is not string");
        
        return this.message = message;
    }
    set setErrorMessage(errorMessage) {
        if (!SendForm.stringValid(errorMessage)) throw TypeError("Parameter is not string");
        
        return this.errorMessage = errorMessage;
    }
    set setDatas(datas) {
        if (!SendForm.objectValid(datas)) throw TypeError("Parameter is not object");
        
        return this.datas = datas;
    }
}