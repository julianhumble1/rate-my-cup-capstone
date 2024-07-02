import { render, screen, act } from "@testing-library/react";
import ListOfReviews from "../../src/components/ListOfReviews.jsx";
import ReviewService from "../../src/services/ReviewService.js";
import ReviewDataFormatter from "../../src/utils/ReviewDataFormatter.js";
import { MemoryRouter } from "react-router-dom";
import { afterEach, beforeEach } from "vitest";

describe("List Of Reviews page tests", () => {

    beforeEach(() => {  
        vi.mock("react-route-dom", async () => {
            const mod = await vi.importActual("react-router-dom")
            return {
                ...mod,
                useParams: () => ({
                    locationId: 123,
                    drinkType: null
                })
            }
        })

        vi.mock("../../src/services/ReviewService.js", () => ({
            default: class {
                static getAllLocationReviews = vi.fn();
            }
        }))

        vi.mock("../../src/utils/ReviewDataFormatter.js", () => ({
            default: class {
                static arrangeReviewsByDrink = vi.fn();
            }
        }))
    })

    afterEach(() => {
        vi.restoreAllMocks()
    })

    it("should display All reviews if drinkType is null", async () => {
        // Arrange
        await act(async () => {
            render(<MemoryRouter>
                <ListOfReviews />
            </MemoryRouter>)
        })
        // Act
        const allReviews = screen.getByText("All Reviews")
        // Assert
        expect(allReviews).toBeInTheDocument();

    })

})