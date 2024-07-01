import { expect } from "chai";
import sinon from "sinon";

import Review from "../../src/models/Review.model.js";
import ReviewService from "../../src/services/Review.service.js";

describe("Review service tests", () => {
    let reviewService;
    beforeEach(() => {
        reviewService = new ReviewService()
    })

    describe("addNewReview service tests", () => {

        let reviewStub;
        let saveStub;
        let newReview;
        let userId
        beforeEach(() => {
            reviewStub = sinon.stub(Review.prototype, "constructor")
            saveStub = sinon.stub(Review.prototype, "save");
            newReview = {
                locationId: 'testLocationId',
                drinkType: 'Latte',
                price: 2,
                rating: 4,
                comment: 'very nice'
            } 
            userId = 123
        })

        afterEach(() => {
            sinon.restore();
        })

        it("should call save and return the result when a valid Review is added", async () => {
            // Arrange
            const newReviewDoc = {
                locationId: 'testLocationId',
                drinkType: 'Latte',
                price: 2,
                rating: 4,
                comment: 'very nice',
                userId: '123'
            }

            reviewStub.returns(newReviewDoc)
            saveStub.returns(newReviewDoc)
            // Act
            const result = await reviewService.addNewReview(newReview, userId)
            // Arrange
            expect(result).to.contain(newReviewDoc)
        })

        it("should throw expected error when new document  save fails", async () => {
            // Arrange
            const invalidReview = {}
            const error = new Error("Failed to save")
            saveStub.throws(error) 
            // Act
            try {
                await reviewService.addNewReview(invalidReview, userId)
                expect.fail("Expected error was not thrown")
            } catch (e) {
                expect(e.message).to.equal("Failed to save to database");
            } 
        })
    })
    
    describe("getReviewsByLocation service tests", () => {

        let reviewsStub;
        let locationId
        beforeEach(() => {
            reviewsStub = sinon.stub(Review, "find")
            locationId = "testLocationId"
        })

        afterEach(() => {
            sinon.restore();
        })

        it("should throw internal system error when database call fails", async () => {
            // Arrange
            const error = new Error("failed database call")
            reviewsStub.throws(error)
            // Act // Assert
            try {
                await reviewService.getReviewsByLocation(locationId)
                expect.fail("Expected error was not thrown")
            } catch (e) {
                expect(e.message).to.equal("Internal system error");
            } 
        })

        it("should return an empty array when no reviews are found", async () => {
            // Arrange
            reviewsStub.returns([])
            // Act
            const result = await reviewService.getReviewsByLocation(locationId)
            // Assert
            expect(result).to.deep.equal([])
        })
    })
})