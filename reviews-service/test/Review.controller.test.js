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

        it("should respond with 201 status code if request is successful", async () => {
            // Arrange
            reviewServices.addNewReview.resolves(newReview);
            // Act
            await reviewController.addNewReview(req, res)
            // Assert
            expect(res.status.calledWith(201)).to.be.true;
        })

        it("should respond with 400 status code if unable to create new review document", async () => {
            // Arrange
            reviewServices.addNewReview.rejects(new Error("Failed to create Review document"));
            // Act
            await reviewController.addNewReview(req, res)
            // Assert
            expect(res.status.calledWith(400)).to.be.true;
        })

        it("should respond with 500 status code if internal system error", async () => {
            // Arrange
            reviewServices.addNewReview.rejects(new Error("Failed to save to database"));
            // Act
            await reviewController.addNewReview(req, res)
            // Assert
            expect(res.status.calledWith(500)).to.be.true;
        })
    })
})