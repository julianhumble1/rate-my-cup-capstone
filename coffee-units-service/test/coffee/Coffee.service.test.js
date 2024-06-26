import { expect } from "chai";
import sinon from "sinon";
import axios from "axios";

import CoffeeService from "../../src/services/Coffee.service.js";

describe("Coffee Service tests", () => {
    let coffeeService;

    beforeEach(() => {
    coffeeService = new CoffeeService();
    })

    describe("getCoffeeByLocation service tests", () => {
        const testPostcode = "tw18 2df";
        let axiosStub;
    
        beforeEach(() => {
            axiosStub = sinon.stub(axios, "get")
        })

        afterEach(() => {
            sinon.restore();
        })
    
        it("should throw an error if axios call to convert postcode fails", async () => {
            // Arrange
            const error = new Error("postcode conversion failure")
            axiosStub.throws(error)
            // Act // Assert
            try {
                await coffeeService.getCoffeeByLocation(testPostcode);
                expect.fail("Expected error was not thrown")
            } catch (e) {
                expect(e.message).to.equal("Failed to convert postcode to coordinates");
            } 
        })

        it("should throw an error if axios call to get coffee shops from coords fails", async () => {
            // Arrange
            const getCoordsStub = sinon.stub(coffeeService, "getCoordsFromPostcode")
            getCoordsStub.resolves({ lat: 51.435087, lon: -0.506118 })
            const error = new Error("coffee shop list call failure")
            axiosStub.throws(error)
            // Act // Assert
            try {
                await coffeeService.getCoffeeByLocation(testPostcode);
                expect.fail("Expected error was not thrown")
            } catch (e) {
                expect(e.message).to.equal("Failed to obtain coffee shop list from coordinates");
            } 
        })

        it("should return expected data list if successful", async () => {
            // Arrange
            const getCoordsStub = sinon.stub(coffeeService, "getCoordsFromPostcode")
            getCoordsStub.resolves({ lat: 51.435087, lon: -0.506118 })

            axiosStub.resolves({
                "data": {
                    "results": {
                        "test": "test"
                    }
                }
            })
            // Act
            const resultsList = await coffeeService.getCoffeeByLocation(testPostcode)
            // Assert
            expect(resultsList.test).to.equal("test")
        })
    })
})
