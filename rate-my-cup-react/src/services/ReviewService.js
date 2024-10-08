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
            throw new Error(e.response.data)
        }
    }

    static editReview = async (drinkType, rating, price, comment, reviewId, reviewUserId, token) => {
        try {
            await axios.put(`${API_URL}/`, {
                drinkType: drinkType,
                rating: rating,
                price: price,
                comment: comment,
                reviewId: reviewId,
                reviewUserId: reviewUserId
            }, {
                headers: {
                    "x-access-token": token
                }
            })
        } catch (e) {
            throw new Error(e.response.data)
        }
    }

    static getAllLocationReviews = async (locationId) => {
        try {
            const reviews = await axios.get(`${API_URL}/location?locationId=${locationId}`)
            return reviews.data
        } catch (e) {
            throw new Error(e.message)
        }
    }
}