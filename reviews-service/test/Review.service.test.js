import { expect } from "chai";
import sinon from "sinon";

import Review from "../src/models/Review.model.js";
import ReviewService from "../src/services/Review.service.js";

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
            const result = await reviewService.addNewReview(newReview)
            // Arrange
            expect(result).to.contain(newReviewDoc)
        })


    })
})