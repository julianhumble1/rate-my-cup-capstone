import { Schema, model } from "mongoose";

const reviewSchema = new Schema({
    locationId: { type: String, required: true },
    drinkType: { type: String, required: true },
    price: { type: Number, required: true, min: 1, max: 3 },
    rating: { type: Number, required: true, min: 1, max: 5 },
    comment: { type: String, required: false },
    userId: { type: String, required: true }
})

const Review = model("Review", reviewSchema)

export default Review;