import { render, screen } from "@testing-library/react"
import userEvent from "@testing-library/user-event"

import Registration from "../src/components/Registration.jsx"
import UserService from "../src/services/UserService.js";

describe("Registration Tests", () => {
    let emailInput;
    let passwordInput;

    
    beforeEach(async () => {
        render(
            <Registration />
        )
        emailInput = await screen.findByPlaceholderText("email@email.com")
        passwordInput = await screen.findByPlaceholderText("Password")
        
        vi.mock("../src/services/UserService.js", () => ({
            default: class {
                static register = vi.fn();
            }
        }))
    })
    
    afterEach(() => {
        vi.clearAllMocks();
    })

    describe("Email and password error message tests", () => {
        it("should render invalid email message after entering an invalid email", async () => {
            // Arrange
            // Act
            await userEvent.type(emailInput, "invalidEmail")
            await userEvent.tab()
            // Assert
            expect(screen.getByText("Please enter a valid email address")).toBeInTheDocument();
        })

        it("should render invalid password message after entering an invalid password", async () => {
            // Arrange
            // Act
            await userEvent.type(passwordInput, "badpassword");
            await userEvent.tab();
            // Assert
            expect(screen.getByText("Password must contain a special character, number and be at least 8 characters long")).toBeInTheDocument();
        })

        it("should not render invalid email message after entering valid email", async() => {
            // Arrange
            // Act
            await userEvent.type(emailInput, "email@email.com")
            await userEvent.tab();
            // Assert
            expect(screen.queryByText("Please enter a valid email address")).not.toBeInTheDocument();
        })

        it("should not render invalid email password after entering valid password", async () => {
            // Arrange
            // Act
            await userEvent.type(passwordInput, "password1!");
            await userEvent.tab();
            // Assert
            expect(screen.queryByText("Password must contain a special character, number and be at least 8 characters long")).not.toBeInTheDocument();
        })
    })

    describe("Registration button render effect tests", () => {
        it("should render failed registration message if email is invalid", async () => {
            // Arrange
            await userEvent.type(emailInput, "badEmail")
            await userEvent.type(passwordInput, "password1!")
            // Act
            const registerButton = screen.getByRole('button', { name: 'Sign Up' });
            await userEvent.click(registerButton);
            // Assert
            expect(screen.getByText("Ensure inputted details are valid before registering")).toBeInTheDocument()
        })

        it("should render failed registration message if password is invalid", async () => {
            // Arrange
            await userEvent.type(emailInput, "email@email.com")
            await userEvent.type(passwordInput, "badpassword")
            // Act
            const registerButton = screen.getByRole('button', { name: 'Sign Up' });
            await userEvent.click(registerButton);
            // Assert
            expect(screen.getByText("Ensure inputted details are valid before registering")).toBeInTheDocument()
        })

        it("should render successful register message after  successful registration", async () => {
            // Arrange
            await userEvent.type(emailInput, "email@email.com")
            await userEvent.type(passwordInput, "password1!")
            // Act
            const registerButton = screen.getByRole('button', { name: 'Sign Up' });
            await userEvent.click(registerButton);
            // Assert
            expect(screen.getByText("Registration Successful!")).toBeInTheDocument();
        })

        it("should no longer render form after successful registration", async () => {
            // Arrange
            await userEvent.type(emailInput, "email@email.com")
            await userEvent.type(passwordInput, "password1!")
            // Act
            const registerButton = screen.getByRole('button', { name: 'Sign Up' });
            await userEvent.click(registerButton);
            // Assert
            expect(screen.queryByTestId("registration-form")).not.toBeInTheDocument();
        })

        it("should still render form after invalid registration", async () => {
            // Arrange
            await userEvent.type(emailInput, "bademail")
            await userEvent.type(passwordInput, "badpassword")
            // Act
            const registerButton = screen.getByRole('button', { name: 'Sign Up' });
            await userEvent.click(registerButton);
            // Assert
            expect(screen.queryByTestId("registration-form")).toBeInTheDocument();
        })

        it("should still render form after failed registration", async () => {
            // Arrange
            await userEvent.type(emailInput, "email@email.com")
            await userEvent.type(passwordInput, "password1!")
            UserService.register.mockRejectedValue(new Error("Failed registration"))
            // Act
            const registerButton = screen.getByRole('button', { name: 'Sign Up' });
            await userEvent.click(registerButton);
            // Assert
            expect(screen.queryByTestId("registration-form")).toBeInTheDocument();
        })
    })
})