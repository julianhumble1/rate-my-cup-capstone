import { MemoryRouter } from "react-router-dom";
import Home from "../../src/components/Home.jsx"
import { render, screen } from "@testing-library/react"
import userEvent from "@testing-library/user-event"
import CoffeeService from "../../src/services/CoffeeService.js";
import { describe } from "vitest";

describe("Home search page tests", () => {
    let postcodeInput;

    let successfulResponse = [];
    for (let i = 1; i <= 30; i++) {
        let result = {
            id: i,
            name: `result ${i}`,
            address: `address ${i}`
        }
        successfulResponse.push(result)
    }

    beforeEach(async () => {
        render(
            <MemoryRouter>
                <Home />
            </MemoryRouter>
        )

        postcodeInput = await screen.findByPlaceholderText("Postcode")

        vi.mock("../../src/services/CoffeeService.js", () => ({
            default: class {
                static locationSearch = vi.fn();
            }
        }))
    })

    afterEach(() => {
        vi.clearAllMocks();
    })

    describe("Search by location, no additional parameters", () => {
        it("should render invalid postcode message if postcode is invalid", async () => {
            // Arrange
            await userEvent.type(postcodeInput, "invalidPostcode")
            CoffeeService.locationSearch.mockRejectedValue(new Error("Request failed with status code 400"))
            // Act
            const searchButton = screen.getByTestId("location-search-button")
            await userEvent.click(searchButton)
            // Assert
            expect(screen.queryByText("Invalid postcode. Please ensure postcode is valid before trying again")).toBeInTheDocument();
        })
    })

})