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

        it("should return expected array when reviews are found", async () => {
            // Arrange
            const reviewResult1 = {
                message: "Test1"
            }
            const reviewResult2 = {
                message: "Test2"
            }
            reviewsStub.returns([reviewResult1, reviewResult2])
            // Act
            const result = await reviewService.getReviewsByLocation(locationId)
            // Assert
            expect(result).to.deep.equal([reviewResult1, reviewResult2])
        })
    })

    describe("editReview service tests", () => {
        let reviewsStub;
        let reqBody
        beforeEach(() => {
            reviewsStub = sinon.stub(Review, "findOneAndUpdate")
            reqBody = {
                "drinkType": "Espresso", 
                "rating": 3,
                "price": 2,
                "comment": "",
                "reviewId": "66846b6271416785046e06b2",
            }
        })

        afterEach(() => {
            sinon.restore();
        })

        it("should return updatedReview if request is successful", async () => {
            // Arrange
            const updatedReview = {review: "updatedReview"}
            reviewsStub.resolves(updatedReview)
            // Act
            const result = await reviewService.editReview(reqBody)
            // Assert
            expect(result).to.equal(updatedReview)
        })

        it("should throw internal system error when database call fails", async () => {
            // Arrange
            const error = new Error("failed database call")
            reviewsStub.throws(error)
            // Act // Assert
            try {
                await reviewService.editReview(reqBody)
                expect.fail("Expected error was not thrown")
            } catch (e) {
                expect(e.message).to.equal("Internal system error");
            } 
        })

         it("should throw review not found error when no review matches", async () => {
            // Arrange
            reviewsStub.resolves(null)
            // Act // Assert
            try {
                await reviewService.editReview(reqBody)
                expect.fail("Expected error was not thrown")
            } catch (e) {
                expect(e.message).to.equal("Review not found");
            } 
        })
    })
})