import { render, screen, act } from "@testing-library/react";
import ListOfReviews from "../../src/components/ListOfReviews.jsx";
import ReviewService from "../../src/services/ReviewService.js";
import ReviewDataFormatter from "../../src/utils/ReviewDataFormatter.js";
import { MemoryRouter } from "react-router-dom";
import { afterEach, beforeEach } from "vitest";

describe("List Of Reviews page tests", () => {

    beforeEach(() => {  

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
        vi.resetAllMocks()
    })

    it("should display All reviews if drinkType is null", async () => {
        // Arrange
       vi.mock("react-router-dom", async () => {
            const mod = await vi.importActual("react-router-dom");
            return {
                ...mod,
                useParams: vi.fn(() => ({
                    locationId: 123,
                    drinkType: null
                })),
            };
        });
        // Act
        await act(async () => {
            render(<MemoryRouter>
                <ListOfReviews />
            </MemoryRouter>)
        })
        const allRates = screen.getByText("All Rates")
        // Assert
        expect(allRates).toBeInTheDocument();
    })

    // it("should display Latte reviews if drinkType is Latte", async () => {
    //     // Arrange
    //     vi.mock("react-router-dom", async () => {
    //         const mod = await vi.importActual("react-router-dom");
    //         return {
    //             ...mod,
    //             useParams: vi.fn(() => ({
    //                 locationId: 123,
    //                 drinkType: "Latte"
    //             })),
    //         };
    //     });
    //     // Act
    //     await act(async () => {
    //         render(<MemoryRouter>
    //             <ListOfReviews />
    //         </MemoryRouter>)
    //     })
    //     const latteReviews = screen.getByText("Latte Reviews")
    //     // Assert
    //     expect(latteReviews).toBeInTheDocument();
    // })

})