import { expect } from "chai";
import sinon from "sinon";

import ReviewController from "../../src/controllers/Review.controller.js";
import ReviewValidator from "../../src/middleware/ReviewValidator.js";

describe("Review Controller tests", () => {

    let reviewController;
    let reviewService;

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
            reviewService = {
                addNewReview: sinon.stub()
            }
            reviewController = new ReviewController(reviewService)

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
            reviewService.addNewReview.resolves(newReview);
            // Act
            await reviewController.addNewReview(req, res)
            // Assert
            expect(res.json.calledWith(newReview)).to.be.true;
        })

        it("should respond with 201 status code if request is successful", async () => {
            // Arrange
            reviewService.addNewReview.resolves(newReview);
            // Act
            await reviewController.addNewReview(req, res)
            // Assert
            expect(res.status.calledWith(201)).to.be.true;
        })

        it("should respond with 400 status code if unable to create new review document", async () => {
            // Arrange
            reviewService.addNewReview.rejects(new Error("Failed to create Review document"));
            // Act
            await reviewController.addNewReview(req, res)
            // Assert
            expect(res.status.calledWith(400)).to.be.true;
        })

        it("should respond with 500 status code if internal system error", async () => {
            // Arrange
            reviewService.addNewReview.rejects(new Error("Failed to save to database"));
            // Act
            await reviewController.addNewReview(req, res)
            // Assert
            expect(res.status.calledWith(500)).to.be.true;
        })
    })
    describe("getReviewsByLocation controller tests", () => {

        let reviewResult1
        let reviewResult2

        beforeEach(() => {
            reviewService = {
                getReviewsByLocation: sinon.stub()
            }
            reviewController = new ReviewController(reviewService)

            req = {
                query: {
                    locationId: "testLocationId"
                }
            }
            reviewResult1 = {
                message: "Test1"
            }
            reviewResult2 = {
                message: "Test2"
            }
        })

        afterEach(() => {
            sinon.restore();
        })

        it("should respond with status code 400 if no locationId is provided", async () => {
            // Arrange
            req = {
                query: {}
            }
            // Act
            await reviewController.getReviewsByLocation(req,res);
            // Assert
            expect(res.status.calledWith(400)).to.be.true

        })

        it("should respond with status code 501 if service throws error", async () => {
            // Arrange
            const error = new Error("Service threw error")
            reviewService.getReviewsByLocation.rejects(error)
            // Act
            await reviewController.getReviewsByLocation(req, res)
            // Assert
            expect(res.status.calledWith(501)).to.be.true
        })

        it("should respond with status code 200 if service call is successful", async () => {
            // Arrange
            const validResponse = [reviewResult1, reviewResult2]
            reviewService.getReviewsByLocation.resolves(validResponse)
            // Act
            await reviewController.getReviewsByLocation(req, res)
            // Assert
            expect(res.status.calledWith(200)).to.be.true
        })

        it("should respond with reviews in body if service call is successful", async () => {
            // Arrange
            const validResponse = [reviewResult1, reviewResult2]
            reviewService.getReviewsByLocation.resolves(validResponse)
            // Act
            await reviewController.getReviewsByLocation(req, res)
            // Assert
            expect(res.json.calledWith(validResponse)).to.be.true
        })
    })
})