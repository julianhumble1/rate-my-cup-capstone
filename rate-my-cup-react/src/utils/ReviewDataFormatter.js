export default class ReviewDataFormatter {

    static arrangeReviewsByDrink = (reviewsArray) => {
        const drinkTypes = ["Latte", "Espresso", "Americano", "Cappuccino", "Mocha", "Flat White", "Tea", "Other"]
        let sortedReviews = {}
        for (let i = 0; i < drinkTypes.length; i++) { sortedReviews[drinkTypes[i]] = [] }
        if (reviewsArray.length === 0) {
            return sortedReviews
        }
        for (let i = 0; i < reviewsArray.length; i++) {
            const reviewDrink = reviewsArray[i].drinkType;
            sortedReviews[reviewDrink].push(reviewsArray[i])
        }
        return sortedReviews
    }

    static calculateAverageRating = (reviewsArray) => {
        if (reviewsArray.length === 0) {
            return 0
        }
        let total = 0;
        for (let i = 0; i < reviewsArray; i++) {
            total += reviewsArray[i].rating
        }
        const average = total / (reviewsArray.length)
        return average
    }

}