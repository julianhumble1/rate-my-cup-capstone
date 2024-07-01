import ReviewDataFormatter from "../../src/utils/ReviewDataFormatter.js"

describe("ReviewDataFormatter Tests", () => {
    
    describe("arrangeReviewsByDrink tests", () => {

        it("should return an object of size 8 if reviewsArray is empty", () => {
            // Arrange
            const testReviewsArray = [];
            // Act
            const result = ReviewDataFormatter.arrangeReviewsByDrink(testReviewsArray)
            console.log(result)
            // Assert
            expect(Object.keys(result).length).to.equal(8)
        })
    
        it("should sort a single result into the correct array", () => {
            // Arrange
            const testReview1 = {drinkType: "Latte"}
            const testReviewsArray = [testReview1];
            // Act
            const result = ReviewDataFormatter.arrangeReviewsByDrink(testReviewsArray)
            // Assert
            expect(result.Latte).to.deep.equal([testReview1])
        })
    
        it("should sort multiple results into their correct arrays", () => {
            // Arrange
            const testReview1 = { drinkType: "Latte" }
            const testReview2 = {drinkType: "Espresso"}
            const testReviewsArray = [testReview1, testReview2];
            // Act
            const result = ReviewDataFormatter.arrangeReviewsByDrink(testReviewsArray)
            // Assert
            expect(result.Latte).to.deep.equal([testReview1]);
            expect(result.Espresso).to.deep.equal([testReview2]);
        })
    })

    describe("calculateAverageRating tests", () => {

        it("should return 0 if reviews array is empty", () => {
            // Arrange
            // Act
            const result = ReviewDataFormatter.calculateAverageRating([])
            // Assert
            expect(result).to.equal(0)

        })

    })
})