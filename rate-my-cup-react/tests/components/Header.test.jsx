import { MemoryRouter } from "react-router-dom"
import Header from "../../src/components/Header.jsx"
import { render, screen } from "@testing-library/react"

describe("Header tests", () => {
    it("should render logout button if logged in is true", () => {
        // Arrange
        render(
            <MemoryRouter >
                <Header loggedIn={true} />
            </MemoryRouter>
        )
        // Act
        // Assert
        expect(screen.getByText("Logout")).toBeInTheDocument();
    })

    it("should not render logout button if logged in is false", () => {
        // Arrange
        render(
            <MemoryRouter >
                <Header loggedIn={false} />
            </MemoryRouter>
        )
        // Act
        // Assert
        expect(screen.queryByText("Logout")).not.toBeInTheDocument();
    })
})