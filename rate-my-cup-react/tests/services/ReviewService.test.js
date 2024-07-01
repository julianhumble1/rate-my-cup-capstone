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

    describe("getAllLocationReviews tests", () => {
        it("should throw an error when axios request fails", async () => {
             // Arrange
            axios.get.mockRejectedValue({
                message: "Axios request failed"
            })
            // Act // Assert
            try {
                await ReviewService.getAllLocationReviews("invalidLocationId");
                throw new Error("Expected register to throw an error, but it did not");
            } catch (error) {
                expect(error.message).toBe("Axios request failed");
            }
        })

        it("should return axios response when axios call is successful", async () => {
            // Arrange
            const reviewResult = {
                "_id": "66807bd072342a12d348d8bf",
                "locationId": "Q-WhI_pokyksoCGaVEvxaQ",
                "drinkType": "Latte",
                "price": 2,
                "rating": 4,
                "comment": "",
                "userId": "6680779dde883bb1f2795dd7",
                "__v": 0
            }
            axios.get.mockResolvedValue({
                data: [reviewResult]
            })
            // Act
            const reviews = await ReviewService.getAllLocationReviews("invalidLocationId");
            // Assert
            expect(reviews.data).to.deep.equal([reviewResult])
            
        })
    })
})