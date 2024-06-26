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
    })
})
