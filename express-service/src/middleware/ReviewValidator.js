import * as expressValidator from "express-validator"

export default class ReviewValidator {

    static validateNewReview = () => {
        return [
            expressValidator.body("drinkType")
                .isIn(["Latte", "Espresso", "Americano", "Cappuccino", "Mocha", "Flat White", "Tea", "Other"]).withMessage("Drink Type must be one of available drink types"),
            
            expressValidator.body("rating")
                .isInt({ min: 1, max: 5 }).withMessage("Rating must be a number 1 to 5"),

            expressValidator.body("price")
                .isInt({ min: 1, max: 3 }).withMessage("Price must be a number 1 to 3"),
            
            expressValidator.body("comment")
                .optional({ checkFalsy: true })
                .isString().withMessage("Comment must be a string"),
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