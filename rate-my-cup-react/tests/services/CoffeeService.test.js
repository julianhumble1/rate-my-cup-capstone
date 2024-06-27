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
    })
})