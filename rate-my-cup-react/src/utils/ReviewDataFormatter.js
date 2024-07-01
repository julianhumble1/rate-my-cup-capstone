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


}