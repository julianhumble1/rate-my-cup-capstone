import { MemoryRouter } from "react-router-dom"
import Header from "../../src/components/Header.jsx"
import { render, screen } from "@testing-library/react"
import userEvent from "@testing-library/user-event"

describe("Header tests", () => {
    describe("Logout Button render tests", () => {

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

    describe("Logout Button effect tests", () => {

        beforeEach(() => {
            render(
                <MemoryRouter >
                    <Header loggedIn={true} setLoggedIn={vi.fn()} />
                </MemoryRouter>
            )

            global.localStorage = {
                removeItem: vi.fn()
            }
        })

        afterEach(() => {
            vi.clearAllMocks();
        })

        it("should remove token from local storage", async() => {
            // Arrange
            // Act
            const logoutButton = screen.getByRole('button', { name: 'Logout' });
            await userEvent.click(logoutButton);
            // Assert
            expect(global.localStorage.removeItem).toHaveBeenCalledWith("accessToken")
        })

        it("should remove role from local storage", async() => {
            // Arrange
            // Act
            const logoutButton = screen.getByRole('button', { name: 'Logout' });
            await userEvent.click(logoutButton);
            // Assert
            expect(global.localStorage.removeItem).toHaveBeenCalledWith("role")
        })

        it("should remove id from local storage", async() => {
            // Arrange
            // Act
            const logoutButton = screen.getByRole('button', { name: 'Logout' });
            await userEvent.click(logoutButton);
            // Assert
            expect(global.localStorage.removeItem).toHaveBeenCalledWith("id")
        })
    })
})