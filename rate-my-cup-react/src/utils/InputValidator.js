export default class InputValidator {

    static validateEmail = (email) => {
        const emailRegEx = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
        return emailRegEx.test(email);
    }
    
    static validatePassword = (password) => {
        const passwordRegEx = /^(?=.*[0-9])(?=.*[!@#$%^&*]).{8,}$/;
        return passwordRegEx.test(password);
    }
}