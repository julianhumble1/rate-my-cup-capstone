import ReviewDataFormatter from "../../src/utils/ReviewDataFormatter.js"

describe("ReviewDataFormatter Tests", () => {
    
    describe("arrangeReviewsByDrink tests", () => {

        it("should return an object of size 8 if reviewsArray is empty", () => {
            // Arrange
            const testReviewsArray = [];
            // Act
            const result = ReviewDataFormatter.arrangeReviewsByDrink(testReviewsArray)
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

        it("should return the rating of the drink if only 1 review in array", () => {
            // Arrange
            const testReview1 = { drinkType: "Latte", rating: 3 }
            // Act
            const result = ReviewDataFormatter.calculateAverageRating([testReview1])
            // Assert
            expect(result).to.equal(3)
        })

        it("should return the average rating of drinks if multiple reviews", () => {
            // Arrange
            const testReview1 = { drinkType: "Latte", rating: 4 }
            const testReview2 = { drinkType: "Latte", rating: 2 }
            // Act
            const result = ReviewDataFormatter.calculateAverageRating([testReview1, testReview2])
            // Assert
            expect(result).to.equal(3)
        })

        it("should return the whole number below the average rating of drinks if multiple reviews and average should round down", () => {
            // Arrange
            const testReview1 = { drinkType: "Latte", rating: 4 }
            const testReview2 = { drinkType: "Latte", rating: 3 }
            const testReview3 = { drinkType: "Latte", rating: 3 }
            // Act
            const result = ReviewDataFormatter.calculateAverageRating([testReview1, testReview2, testReview3])
            // Assert
            expect(result).to.equal(3)
        })

        it("should return the whole number above the average rating of drinks if multiple reviews and average should round down", () => {
            // Arrange
            const testReview1 = { drinkType: "Latte", rating: 4 }
            const testReview2 = { drinkType: "Latte", rating: 4 }
            const testReview3 = { drinkType: "Latte", rating: 3 }
            // Act
            const result = ReviewDataFormatter.calculateAverageRating([testReview1, testReview2, testReview3])
            // Assert
            expect(result).to.equal(4)
        })
    })

    describe("calculateModePrice tests", () => {

        it("should return 0 if empty array is passed in", () => {
            // Arrange
            // Act
            const result = ReviewDataFormatter.calculateModePrice([])
            // Assert
            expect(result).to.equal(0)
        })

        it("should return the price of the drink if only one review", () => {
            // Arrange
            const testReview1 = { drinkType: "Latte", rating: 3, price: 1 }
            // Act
            const result = ReviewDataFormatter.calculateModePrice([testReview1])
            // Assert
            expect(result).to.equal(1)
        })

        it("should return the lower of two modes if two modes", () => {
            // Arrange
            const testReview1 = { drinkType: "Latte", rating: 3, price: 1 }
            const testReview2 = { drinkType: "Latte", rating: 2, price: 2 }
            // Act
            const result = ReviewDataFormatter.calculateModePrice([testReview1,testReview2])
            // Assert
            expect(result).to.equal(1)
        })

        it("should return the mode if many reviews", () => {
            // Arrange
            const testReview1 = { drinkType: "Latte", rating: 3, price: 1 }
            const testReview2 = { drinkType: "Latte", rating: 2, price: 2 }
            const testReview3 = { drinkType: "Latte", rating: 2, price: 2 }
            // Act
            const result = ReviewDataFormatter.calculateModePrice([testReview1,testReview2, testReview3])
            // Assert
            expect(result).to.equal(2)
        })
    })
})