import ReviewService from "../../src/services/ReviewService.js";
import axios from "axios"

describe("Review Service tests", () => {
    beforeEach(() => {
        vi.mock("axios")
    })

    afterEach(() => {
        vi.clearAllMocks();
    })

    describe("newReview tests", () => {
        it("should throw an error when axios request fails", async () => {
            // Arrange
            axios.post.mockRejectedValue({
                message: "Axios request failed"
            })
            // Act // Assert
            try {
                await ReviewService.newReview("invalidReview");
                throw new Error("Expected register to throw an error, but it did not");
            } catch (error) {
                expect(error.message).toBe("Axios request failed");
            }
        })
    })
})