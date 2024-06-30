import NewRate from "../../src/components/NewRate.jsx";
import { render, screen } from "@testing-library/react"
import userEvent from "@testing-library/user-event";
import { afterEach, beforeEach, describe } from "vitest";
import { MemoryRouter } from "react-router-dom";
import ReviewService from "../../src/services/ReviewService.js";

describe("New Rate page tests", () => {

    let drinkChoice;
    let ratingChoice;
    let priceChoice;
    let submitButton

    beforeEach(async () => {
        vi.mock("../../src/services/ReviewService.js", () => ({
            default: class {
                static newReview = vi.fn()
            }
        }))

        global.localStorage = {
            getItem: vi.fn()
        }

        render(
            <MemoryRouter>
                <NewRate />
            </MemoryRouter>
        )

        drinkChoice = await screen.findByTestId("drink-choice")
        ratingChoice = await screen.findByTestId("rating-choice")
        priceChoice = await screen.findByTestId("price-choice")
        submitButton = await screen.findByRole("button")
    })

    afterEach(() => {
        vi.restoreAllMocks();
    })

    it("should render successful creation message if add is successful", async () => {
        // Arrange
        await userEvent.selectOptions(drinkChoice, "Latte")
        await userEvent.selectOptions(ratingChoice, "1")
        await userEvent.selectOptions(priceChoice, "1")
        // Act
        await userEvent.click(submitButton)
        const successMessage = await screen.findByText("New Rate successfully created!")
        // Assert
        expect(successMessage).toBeInTheDocument();     
    })

    it("should render error message if add fails", async () => {
        // Arrange
        await userEvent.selectOptions(drinkChoice, "Latte")
        await userEvent.selectOptions(ratingChoice, "1")
        await userEvent.selectOptions(priceChoice, "1")

        const error = new Error("Failed to create new Rate")
        ReviewService.newReview.mockRejectedValue(error)

        // Act
        await userEvent.click(submitButton)
        const failMessage = await screen.findByText("Failed to create new Rate")

        // Assert
        expect(failMessage).toBeInTheDocument();
    })

    it("should disable submit button if drink choice is empty", async () => {
        // Arrange
        await userEvent.selectOptions(ratingChoice, "1")
        await userEvent.selectOptions(priceChoice, "1")
        // Act
        // Assert
        expect(submitButton).toBeDisabled();
    })

    it("should disable submit button if rating choice is empty", async () => {
        // Arrange
        await userEvent.selectOptions(drinkChoice, "Latte")
        await userEvent.selectOptions(priceChoice, "1")
        // Act
        // Assert
        expect(submitButton).toBeDisabled();
    })

    it("should disable submit button if price choice is empty", async () => {
        // Arrange
        await userEvent.selectOptions(drinkChoice, "Latte")
        await userEvent.selectOptions(ratingChoice, "1")
        // Act
        // Assert
        expect(submitButton).toBeDisabled();
    })
})