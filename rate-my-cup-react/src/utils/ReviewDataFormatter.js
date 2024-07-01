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
        for (let i = 0; i < reviewsArray.length; i++) {
            total += reviewsArray[i].rating
        }
        const average = total / (reviewsArray.length)
        return Math.round(average)
    }

    static calculateModePrice = (reviewsArray) => {
        if (reviewsArray.length === 0) {
            return 0
        }
        const priceCounts = {1: 0, 2: 0, 3: 0}
        reviewsArray.forEach(review => {
            priceCounts[review.price]++
        })
        const highestCount = Math.max(...Object.values(priceCounts))
        const modePrice = Object.keys(priceCounts).find(price => priceCounts[price] === highestCount);
        return modePrice
        
    }

}