import { render, screen } from "@testing-library/react";
import DrinkReviewsSummary from "../../src/components/DrinkReviewsSummary.jsx";
import { MemoryRouter } from "react-router-dom";
import ReviewDataFormatter from "../../src/utils/ReviewDataFormatter.js";
import { expect } from "vitest";

describe("Drink Reviews Summary tests", () => {

    let drinkType;

    beforeEach(() => {
        vi.mock("../../src/utils/ReviewDataFormatter.js", () => ({
            default: class {
                static calculateAverageRating = vi.fn();
                static calculateModePrice = vi.fn();
                static arrangeReviewsByDrink = vi.fn();
            }
        }))

        drinkType = "Latte"
    })

    afterEach(() => {
        vi.restoreAllMocks();
    })

    it("should render the drink type name inherited as props", async () => {
        // Arrange
        ReviewDataFormatter.arrangeReviewsByDrink.mockReturnValue({ "Latte": [] })
        render(<MemoryRouter>
            <DrinkReviewsSummary drinkType={drinkType}/>
        </MemoryRouter>)
        // Act
        const drinkName = await screen.findByText("Latte")
        // Assert
        expect(drinkName).toBeInTheDocument()
    })
})