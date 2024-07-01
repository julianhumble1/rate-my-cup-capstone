import LocationDetails from "../../src/components/LocationDetails.jsx"
import { render, screen, act } from "@testing-library/react"
import { afterEach, beforeEach, describe } from "vitest";
import InfoFormatter from "../../src/utils/InfoFormatter.js";
import { MemoryRouter } from "react-router-dom";
import ReviewService from "../../src/services/ReviewService.js";

describe("Location Details page tests", () => {

    describe("Location Info rendering tests", () => {

        

        let successfulResponse;
    
        beforeEach(() => {
            vi.mock("../../src/services/CoffeeService.js", () => ({
                default: class {
                    static getLocationDetails = vi.fn();
                }
            }))
    
            vi.mock("../../src/services/ReviewService.js", () => ({
                default: class {
                    static getAllLocationReviews = vi.fn();
                }
            }))
    
            vi.mock("../../src/utils/InfoFormatter.js", () => ({
                default: class {
                    static formatLocationResults = vi.fn();
                }
            }))
    
            vi.mock("../../src/utils/ReviewDataFormatter.js", () => ({
                default: class {
                    static calculateAverageRating = vi.fn();
                    static calculateModePrice = vi.fn();
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
    
            const successfulReviewResponse = []
            ReviewService.getAllLocationReviews.mockReturnValue(successfulReviewResponse)
        })
    
        afterEach(() => {
            vi.restoreAllMocks();
        })
    
        it("should display the name of the coffee shop returned from the service call", async () => {
            // Arrange
            InfoFormatter.formatLocationResults.mockReturnValue(successfulResponse)
            render(
                <MemoryRouter>
                    <LocationDetails />
                </MemoryRouter>
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
                <MemoryRouter>
                    <LocationDetails />
                </MemoryRouter>
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
                <MemoryRouter>
                    <LocationDetails />
                </MemoryRouter>
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
                <MemoryRouter>
                    <LocationDetails />
                </MemoryRouter>
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
                <MemoryRouter>
                    <LocationDetails />
                </MemoryRouter>
            )
            // Act
            const unavailable = await screen.findByText("Unavailable")
            // Assert
            expect(unavailable).toBeInTheDocument()
        })
    
        it("should display opening hours if response is successful", async () => {
            // Arrange
            InfoFormatter.formatLocationResults.mockReturnValue(successfulResponse)
            await act(async () => {
                render(
                    <MemoryRouter>
                        <LocationDetails />
                    </MemoryRouter>
                )    
            })
            // Act
            const unavailable = screen.queryByText("Unavailable")
            // Assert
            expect(unavailable).not.toBeInTheDocument()
        })
    
        // it("should display network error message if service call fails", async () => {
        //     // Arrange
        //     const error = new Error("service error")
        //     CoffeeService.getLocationDetails.mockRejectedValue(error)
        //     render(
        //         <LocationDetails />
        //     )
        //     // Act
        //     const errorMessage = screen.getByText("service error")
        //     // Assert
        //     expect(errorMessage).toBeInTheDocument()
        // })
    })
    
})