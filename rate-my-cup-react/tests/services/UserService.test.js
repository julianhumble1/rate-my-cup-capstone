import UserService from "../../src/services/UserService.js";
import axios from "axios";

describe("User Service tests", () => {

    beforeEach(() => {
        vi.mock("axios")
    })

    afterEach(() => {
        vi.clearAllMocks();
    })

    describe("register tests", () => {
        it("should throw an error with correct message if axios request throws error", async () => {
            // Arrange
            axios.post.mockRejectedValue({
                response: {
                    data: "failed to add"
                }
            })
            // Act // Assert
            try {
                await UserService.register("test@example.com", "password1!");
                throw new Error("Expected register to throw an error, but it did not");
            } catch (error) {
                expect(error.message).toBe("failed to add");
            }
        })
    })
})