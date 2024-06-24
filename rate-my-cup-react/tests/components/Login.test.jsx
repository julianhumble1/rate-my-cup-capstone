import { render, screen } from "@testing-library/react"
import userEvent from "@testing-library/user-event"
import { MemoryRouter } from "react-router-dom";
import { useNavigate } from "react-router-dom";

import Login from "../../src/components/Login.jsx"
import UserService from "../../src/services/UserService.js";

describe("Login Screen tests", () => {
    let emailInput;
    let passwordInput;

    const successfulResponse = {
        "accessToken": "123",
        "role": "user",
        "id": 1
    }

    beforeEach(async () => {
        render(
            <MemoryRouter>
                <Login />
            </MemoryRouter>
        )
        emailInput = await screen.findByPlaceholderText("email@email.com")
        passwordInput = await screen.findByPlaceholderText("Password")
        
        vi.mock("../../src/services/UserService.js", () => ({
            default: class {
                static login = vi.fn();
            }
        }))


        global.localStorage = {
            setItem: vi.fn()
        }

    })

    afterEach(() => {
        vi.clearAllMocks();
    })
    
    it("should render failed login message if login fails", async () => {
        // Arrange
        await userEvent.type(emailInput, "email@email.com")
        await userEvent.type(passwordInput, "password1!")
        UserService.login.mockRejectedValue(new Error("Failed login"))
        // Act
        const loginButton = screen.getByRole('button', { name: 'Login' });
        await userEvent.click(loginButton);
        // Arrange
        expect(screen.queryByText("Username or password incorrect. Please try again.")).toBeInTheDocument();
    })

    it("should save the token to local storage if login is successful", async () => {
        // Arrange
        await userEvent.type(emailInput, "email@email.com")
        await userEvent.type(passwordInput, "password1!")
        UserService.login.mockResolvedValue(successfulResponse)
        // Act
        const loginButton = screen.getByRole('button', { name: 'Login' });
        await userEvent.click(loginButton);
        // Assert
        expect(global.localStorage.setItem).toHaveBeenCalledWith("accessToken", "123")
    })

    it("should save the role to local storage if login is successful", async () => {
        // Arrange
        await userEvent.type(emailInput, "email@email.com")
        await userEvent.type(passwordInput, "password1!")
        UserService.login.mockResolvedValue(successfulResponse)
        // Act
        const loginButton = screen.getByRole('button', { name: 'Login' });
        await userEvent.click(loginButton);
        // Assert
        expect(global.localStorage.setItem).toHaveBeenCalledWith("role", "user")
    })

    it("should save the id to local storage if login is successful", async () => {
        // Arrange
        await userEvent.type(emailInput, "email@email.com")
        await userEvent.type(passwordInput, "password1!")
        UserService.login.mockResolvedValue(successfulResponse)
        // Act
        const loginButton = screen.getByRole('button', { name: 'Login' });
        await userEvent.click(loginButton);
        // Assert
        expect(global.localStorage.setItem).toHaveBeenCalledWith("id", 1)
    })

})