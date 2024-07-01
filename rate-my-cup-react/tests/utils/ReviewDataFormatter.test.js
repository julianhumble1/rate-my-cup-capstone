import ReviewDataFormatter from "../../src/utils/ReviewDataFormatter.js"

describe("ReviewDataFormatter Tests", () => {
    it("should return an object of size 8", () => {
        // Arrange
        const testReviewsArray = [];
        // Act
        const result = ReviewDataFormatter.arrangeReviewsByDrink(testReviewsArray)
        console.log(result)
        // Assert
        expect(Object.keys(result).length).to.equal(8)
    })
})