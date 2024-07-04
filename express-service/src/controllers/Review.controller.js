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

    getReviewsByLocation = async (req, res) => {
        const locationId = req.query.locationId;
        if (!locationId) {
            return res.status(400).json("No location ID provided")
        }
        try {
            const reviews = await this.#service.getReviewsByLocation(locationId)
            return res.status(200).json(reviews)
        } catch (e) {
            res.status(501).json("Internal system error")
        }
    }

    editReview = async (req, res) => {
        const sentResponse = ReviewValidator.handleValidationErrors(req, res);
        if (sentResponse) return;
        try {
            const updatedReview = await this.#service.editReview(req.body)
            return res.status(200).json(updatedReview)
        } catch (e) {
            if (e.message === "Review not found") {
                return res.status(404).json(e.message)
            } else {
                return res.status(500).json(e.message)
            }
        }
    }
}