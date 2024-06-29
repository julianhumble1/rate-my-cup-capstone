import Review from "../models/Review.model.js";

export default class ReviewService {

    addNewReview = async (newReview, userId) => {
        let review;
        try {
            review = new Review({
                locationId: newReview.locationId,
                drinkType: newReview.drinkType,
                price: newReview.price,
                rating: newReview.rating,
                comment: newReview.comment ?? "",
                userId: userId
            })
        } catch (e) {
            throw new Error("Internal system error")
        }
        return await review.save();
    }
}