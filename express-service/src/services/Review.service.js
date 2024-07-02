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
            throw new Error("Failed to create Review document")
        }
        try {
            return await review.save();
        } catch (e) {
            throw new Error("Failed to save to database")
        }
    }

    getReviewsByLocation = async (locationId) => {
        let reviews
        try {
            reviews = await Review.find({ locationId: locationId })
            return reviews;
        } catch (e) {
            throw new Error("Internal system error")
        }
    }

    editReview = async ({drinkType, rating, price, comment, reviewId}) => {
        try {
            const updatedReview = await Review.findOneAndUpdate(
                { _id: reviewId },
                {$set: {
                    drinkType: drinkType,
                    rating: rating,
                    price: price,
                    comment: comment    
                }},
                { new: true }
            )
            if (!updatedReview) {
                throw new Error("Review not found")
            }
            return updatedReview
        } catch (e) {
            if (e.message === "Review not found") {
                throw new Error(e.message) 
            } else {
                throw new Error("Internal system error")
            }
        }
    }
}