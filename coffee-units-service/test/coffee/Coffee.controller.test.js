import { expect } from "chai";
import sinon from "sinon";

import CoffeeController from "../../src/controllers/Coffee.controller.js";
import CoffeeValidator from "../../src/middleware/CoffeeValidator.js";

describe("Coffee controller tests", () => {
    
    let coffeeController;
    let coffeeService;

    let req, res, next;
    let coffeeValidatorStub;

    res = {
        json: sinon.spy(),
        status: sinon.stub().returnsThis()
    }

    afterEach(() => {
        sinon.restore();
    })

    describe("getCoffeeByLocation controller tests", () => {

        let formatLocationListStub

        beforeEach(() => {
            coffeeService = {
                getCoffeeByLocation: sinon.stub()
            }
            coffeeController = new CoffeeController(coffeeService)

            req = {
                body: {
                    "postcode" : "tw18 2df"
                }
            }

            next = sinon.spy();

            coffeeValidatorStub = sinon.stub(CoffeeValidator, "handleValidationErrors").callsFake((req, res, next) => next)

            formatLocationListStub = sinon.stub(coffeeController.formatLocationList)

        })

        it("should send response code 503 if service call throws error", async () => {
            // Arrange
            coffeeService.getCoffeeByLocation.rejects(new Error("Service Unavailable"))
            // Act
            await coffeeController.getCoffeeByLocation(req, res)
            // Assert
            expect(res.status.calledWith(503)).to.be.true
        })

    })

})