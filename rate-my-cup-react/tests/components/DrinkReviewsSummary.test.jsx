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

    it("should render no rates yet if reviews array is empty", async () => {
        // Arrange
        ReviewDataFormatter.arrangeReviewsByDrink.mockReturnValue({ "Latte": [] })
        render(<MemoryRouter>
            <DrinkReviewsSummary drinkType={drinkType}/>
        </MemoryRouter>)
        // Act
        const noRatesYet = await screen.findByText("No Rates Yet!")
        // Assert
        expect(noRatesYet).toBeInTheDocument()
    })

    it("should render number of stars equal to value returned by average rating", async () => {
        // Arrange
        ReviewDataFormatter.arrangeReviewsByDrink.mockReturnValue({ "Latte": [{}] })
        ReviewDataFormatter.calculateAverageRating.mockReturnValue(3)
        render(<MemoryRouter>
            <DrinkReviewsSummary drinkType={drinkType}/>
        </MemoryRouter>)
        // Act
        const stars = await screen.findByText("★★★")
        // Assert
        expect(stars).toBeInTheDocument()
    })

    it("should render number of £ equal to value returned by mode price", async () => {
        // Arrange
        ReviewDataFormatter.arrangeReviewsByDrink.mockReturnValue({ "Latte": [{}] })
        ReviewDataFormatter.calculateAverageRating.mockReturnValue(3)
        ReviewDataFormatter.calculateModePrice.mockReturnValue(3)
        render(<MemoryRouter>
            <DrinkReviewsSummary drinkType={drinkType}/>
        </MemoryRouter>)
        // Act
        const pounds = await screen.findByText("£££")
        // Assert
        expect(pounds).toBeInTheDocument()
    })
})