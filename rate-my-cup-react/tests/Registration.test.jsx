import { render, screen } from "@testing-library/react"
import userEvent from "@testing-library/user-event"

import Registration from "../src/components/Registration.jsx"

describe("Registration Tests", () => {
    let emailInput;
    let passwordInput;

    beforeEach(async () => {
        render(
            <Registration />
        )
        emailInput = await screen.findByPlaceholderText("email@email.com")
        passwordInput = await screen.findByPlaceholderText("Password")
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
})