import * as expressValidator from "express-validator"

export default class CoffeeValidator{

    static validatePostcode = () => {
        return [
            expressValidator.body("postcode")
                .matches(/^([Gg][Ii][Rr] ?0[Aa]{2})|((([A-Za-z][0-9]{1,2})|(([A-Za-z][A-Ha-hJ-Yj-y][0-9]{1,2})|(([A-Za-z][0-9][A-Za-z])|([A-Za-z][A-Ha-hJ-Yj-y][0-9]?[A-Za-z])))) ?[0-9][A-Za-z]{2})$/, "i")
                .withMessage("Invalid UK postcode format")
        ]
    }

    static handleValidationErrors = (req, res) => {
        const errors = expressValidator.validationResult(req);
        if (!errors.isEmpty()) {
            const extractedErrors = [];
            errors.array().map(err => extractedErrors.push({ [err.param]: err.msg }))
            res.status(400).json({
                errors:extractedErrors
            })
            return true
        }
        return;
    }
}