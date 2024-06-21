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
    })
})