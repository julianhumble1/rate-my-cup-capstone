import LocationDetails from "../../src/components/LocationDetails.jsx"
import { render, screen } from "@testing-library/react"
import CoffeeService from "../../src/services/CoffeeService.js";
import { afterEach, beforeEach, describe } from "vitest";
import InfoFormatter from "../../src/utils/InfoFormatter.js";

describe("Location Details page tests", () => {
    
    let successfulResponse;

    beforeEach(() => {
        vi.mock("../../src/services/CoffeeService.js", () => ({
            default: class {
                static getLocationDetails = vi.fn();
            }
        }))

        vi.mock("../../src/utils/InfoFormatter.js", () => ({
            default: class {
                static formatLocationResults = vi.fn();
            }
        }))

        successfulResponse = {
            address: "123 Test",
            name: "Test Coffee Shop",
            openingHours: [
                {Saturday: '7:30 - 17:00'},
                {Sunday: '8:00 - 17:00'},
                {Monday: '7:00 - 17:00'},
                {Tuesday: '7:00 - 17:00'},
                {Wednesday: '7:00 - 17:00'},
                {Thursday: '7:00 - 17:00'},
                {Friday: '7:00 - 17:00'}
            ],
            phone: "07123456789",
            url: "www.test.com"
        }
    })

    afterEach(() => {
        vi.restoreAllMocks();
    })

    it("should display the name of the coffee shop returned from the service call", async () => {
        // Arrange
        InfoFormatter.formatLocationResults.mockReturnValue(successfulResponse)
        render(
            <LocationDetails />
        )
        // Act
        const name = await screen.findByText("Test Coffee Shop")
        // Assert
        expect(name).toBeInTheDocument()
    })

    it("should display the url of the coffee shop returned from the service call", async () => {
        // Arrange
        InfoFormatter.formatLocationResults.mockReturnValue(successfulResponse)
        render(
            <LocationDetails />
        )
        // Act
        const url = await screen.findByText("www.test.com")
        // Assert
        expect(url).toBeInTheDocument()
    })

    it("should display the phone number of the coffee shop returned from the service call", async () => {
        // Arrange
        InfoFormatter.formatLocationResults.mockReturnValue(successfulResponse)
        render(
            <LocationDetails />
        )
        // Act
        const phone = await screen.findByText("Phone Number: 07123456789")
        // Assert
        expect(phone).toBeInTheDocument()
    })

    it("should display address of the coffee shop returned from the service call", async () => {
        // Arrange
        InfoFormatter.formatLocationResults.mockReturnValue(successfulResponse)
        render(
            <LocationDetails />
        )
        // Act
        const address = await screen.findByText("Address: 123 Test")
        // Assert
        expect(address).toBeInTheDocument()
    })

    it("should display unavailable opening hours if response returns N/A", async () => {
        // Arrange
        const noOpeningHours = { ...successfulResponse }
        noOpeningHours.openingHours = "N/A"
        InfoFormatter.formatLocationResults.mockReturnValue(noOpeningHours)
        render(
            <LocationDetails />
        )
        // Act
        const unavailable = await screen.findByText("Unavailable")
        // Assert
        expect(unavailable).toBeInTheDocument()
    })

    it("should display  opening hours if response is successful", async () => {
        // Arrange
        InfoFormatter.formatLocationResults.mockReturnValue(successfulResponse)
        render(
            <LocationDetails />
        )
        // Act
        const unavailable = screen.queryByText("Unavailable")
        // Assert
        expect(unavailable).not.toBeInTheDocument()
    })
})