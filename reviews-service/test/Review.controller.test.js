import { expect } from "chai";
import sinon from "sinon";

import ReviewController from "../src/controllers/Review.controller.js";
import ReviewValidator from "../src/middleware/ReviewValidator.js";

describe("Review Controller tests", () => {

    let reviewController;
    let reviewServices;

    let req, res, next;
    let reviewValidatorStub;

    res = {
        json: sinon.spy(),
        status: sinon.stub().returnsThis()
    }

    afterEach(() => {
        sinon.restore();
    })

    describe("addNewReview request tests", () => {

        let newReview;

        beforeEach(() => {
            reviewServices = {
                addNewReview: sinon.stub()
            }
            reviewController = new ReviewController(reviewServices)

            req = {
                userId: "123",
                body: {
                    "drinkType": "Latte",
                    "rating": 4,
                    "price": 2,
                    "locationId": "testLocationId",
                    "comment" : "very nice"
                }
            }

            next = sinon.spy();
            reviewValidatorStub = sinon.stub(ReviewValidator, "handleValidationErrors").callsFake((req, res, next) => next)

            newReview = {
                locationId: 'testLocationId',
                drinkType: 'Latte',
                price: 2,
                rating: 4,
                comment: 'very nice',
                userId: '123'
            }

        })


        afterEach(() => {
            sinon.restore();
        })

        it("should respond with new review in body if request is successful", async () => {
            // Arrange
            reviewServices.addNewReview.resolves(newReview);
            // Act
            await reviewController.addNewReview(req, res)
            // Assert
            expect(res.json.calledWith(newReview)).to.be.true;
        })
    })
})