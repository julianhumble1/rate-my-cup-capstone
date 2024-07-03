import Review from "../../src/components/Review.jsx";
import { render, screen, act } from "@testing-library/react"
import InfoFormatter from "../../src/utils/InfoFormatter.js";
import { MemoryRouter } from "react-router-dom";
import ReviewService from "../../src/services/ReviewService.js";
import CoffeeService from "../../src/services/CoffeeService.js";
import { beforeEach } from "vitest";
import userEvent from "@testing-library/user-event";

describe("review item tests", () => {


    describe("initial review display tests", () => {

        let review;

        beforeEach(() => {
            vi.mock("../../src/services/CoffeeService.js", () => ({
                default: class {
                    static getLocationDetails = vi.fn();
                }
            }))

            vi.mock("../../src/utils/InfoFormatter.js", () => ({
                default: class {
                    static formatLocationResults = vi.fn()
                }
            }))
            InfoFormatter.formatLocationResults.mockReturnValue({"name": "test"})

            vi.mock("../../src/service/ReviewService.js", () => ({
                default: class {
                    static editReview = vi.fn();
                }
            }))

            global.localStorage = {
                getItem: vi.fn(),
            }
            
            review = {
                _id: "testID",
                locationId: "testLocationId",
                userId: "testUserId",
                drinkType: "Latte",
                rating: 2,
                price: 3,
                comment: "test"
            }

        })
        afterEach(() => {
            vi.restoreAllMocks();
        })

        it("should not display edit button if local storage id doesn't match review userID or user is not admin", () => {
            // Arrange
            global.localStorage.getItem.mockImplementation((key) => {
                if (key === "role") return "user";
                if (key === "id") return "notTestId";
                return null;
            });
            // Act
            render(<MemoryRouter>
                <Review review={review} />
            </MemoryRouter>)
            const edit = screen.queryByText("Edit")
            // Assert
            expect(edit).not.toBeInTheDocument();
        })

        it("should display edit button if local storage id matches review userID ", async () => {
            // Arrange
            global.localStorage.getItem.mockImplementation((key) => {
                if (key === "role") return "user";
                if (key === "id") return "testUserId";
                return null;
            });
            // Act
            await act(async () => {
                render(
                    <MemoryRouter>
                        <Review review={review} />
                    </MemoryRouter>
                )    
            })
            const edit = screen.getByText("Edit")
            // Assert
            expect(edit).toBeInTheDocument();
        })

        it("should display edit button if local storage role is admin ", async () => {
            // Arrange
            global.localStorage.getItem.mockImplementation((key) => {
                if (key === "role") return "admin";
                if (key === "id") return "notTestUserId";
                return null;
            });
            
            // Act
            await act(async () => {
                render(
                    <MemoryRouter>
                        <Review review={review} />
                    </MemoryRouter>
                )    
            })
            const edit = screen.getByText("Edit")
            // Assert
            expect(edit).toBeInTheDocument();
        })
    })

    describe("edit review process tests", () => {

        let review;

        beforeEach(() => {
            vi.mock("../../src/services/CoffeeService.js", () => ({
                default: class {
                    static getLocationDetails = vi.fn();
                }
            }))

            vi.mock("../../src/utils/InfoFormatter.js", () => ({
                default: class {
                    static formatLocationResults = vi.fn()
                }
            }))
            InfoFormatter.formatLocationResults.mockReturnValue({"name": "test"})

            vi.mock("../../src/service/ReviewService.js", () => ({
                default: class {
                    static editReview = vi.fn();
                }
            }))

            global.localStorage = {
                getItem: vi.fn(),
            }
            
            review = {
                _id: "testID",
                locationId: "testLocationId",
                userId: "testUserId",
                drinkType: "Latte",
                rating: 2,
                price: 3,
                comment: "test"
            }
        })

        afterEach(() => {
            vi.restoreAllMocks();
        })

        it("should display edit options upon pressing edit", async() => {
            // Arrange
            global.localStorage.getItem.mockImplementation((key) => {
                if (key === "role") return "user";
                if (key === "id") return "testUserId";
                return null;
            });
            await act(async () => {
                render(
                    <MemoryRouter>
                        <Review review={review} />
                    </MemoryRouter>
                )    
            })
            const edit = screen.getByText("Edit")
            // Act
            await userEvent.click(edit)
            const additionalComments = screen.getByText("Additional Comments")
            // Assert
            expect(additionalComments).toBeInTheDocument()
        })


    })
})