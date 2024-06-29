import ReviewService from "../services/Review.service.js";
import ReviewValidator from "../middleware/ReviewValidator.js";

export default class ReviewController {

    #service;

    constructor(service = new ReviewService()) {
        this.#service = service
    }

    addNewReview = async (req, res) => {
        const sentResponse = ReviewValidator.handleValidationErrors(req, res);
        if (sentResponse) return;
        try {
            const newReview = await this.#service.addNewReview(req.body, req.userId)
            return res.status(201).json(newReview)
        } catch (error) {
            if (error.message === "Failed to create Review document") {
                return res.status(400).json(error.message)
            } else {
                return res.status(500).json(error.message)
            }
        }
    }

}