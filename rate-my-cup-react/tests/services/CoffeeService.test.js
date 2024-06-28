import CoffeeService from "../../src/services/CoffeeService.js";
import axios from "axios"

describe("Coffee Service tests", () => {
    beforeEach(() => {
        vi.mock("axios")
    })

    afterEach(() => {
        vi.clearAllMocks();
    })

    describe("locationSearch tests", () => {
        it("should throw an error with correct message if axios request throws error", async () => {
            // Arrange
            axios.get.mockRejectedValue({
                message: "Axios request failed"
            })
            // Act // Assert
            try {
                await CoffeeService.locationSearch("invalidPostcode");
                throw new Error("Expected register to throw an error, but it did not");
            } catch (error) {
                expect(error.message).toBe("Axios request failed");
            }

        })

        it("should return the expected data when axios request is successful", async () => {
            // Arrange
            axios.get.mockResolvedValue({
                data: {
                    message: "Successful"
                }
            })
            // Act
            const responseData = await CoffeeService.locationSearch("TW18 2DF")
            // Assert
            expect(responseData).to.deep.equal({ message: "Successful" })
        })
    })

    describe("getLocationDetails tests", () => {
        it("should throw an error when axios request fails", async () => {
            // Arrange
            axios.get.mockRejectedValue({
                message: "Axios request failed"
            })
            // Act // Assert
            try {
                await CoffeeService.getLocationDetails("invalidId");
                throw new Error("Expected register to throw an error, but it did not");
            } catch (error) {
                expect(error.message).toBe("Axios request failed");
            }
        })

        it("should return the expected data when axios request is successful", async () => {
            // Arrange
            axios.get.mockResolvedValue({
                data: {
                    results: [{
                        poi: {message: "Successful"}
                    }]
                }
            })
            // Act
            const responseData = await CoffeeService.getLocationDetails("Q-WhI_pokyksoCGaVEvxaQ")
            // Assert
            expect(responseData).to.deep.equal({ message: "Successful" })
        })
    })
})