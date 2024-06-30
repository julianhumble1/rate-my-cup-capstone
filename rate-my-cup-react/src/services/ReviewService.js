import axios from "axios"

const API_URL = import.meta.env.VITE_APP_REVIEW_URL

export default class ReviewService {
    static newReview = async (locationId, drinkType, rating, price, comment, token) => {
        try {
            await axios.post(`${API_URL}/new`, {
                locationId: locationId,
                drinkType: drinkType,
                rating: rating,
                price: price,
                comment: comment
            }, {
                headers: {
                    "x-access-token": token
                }
            })
        } catch (e) {
            throw new Error(e.message)
        }
    }
}