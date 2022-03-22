export default class {
    success = false;
    message = null;
    data = new Object();

    static emptyText = new String();
    static emptyData = new Object();

    constructor () {}

    static successValid(success) {
        return typeof success === "boolean";
    }
    static messageValid(message) {
        return typeof message === "string";
    }
    static dataValid(data) {
        return typeof data === "object";
    }
}