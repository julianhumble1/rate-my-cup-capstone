import { expect } from "chai";
import sinon from "sinon";
import bcrypt from "bcrypt"
import jwt from "jsonwebtoken"

import User from "../../src/models/User.model.js";
import UserService from "../../src/services/User.service.js";

describe("User service tests", () => {
    let userService;
    beforeEach(() => {
        userService = new UserService()
    })

    describe("addNewUser service tests", () => {

        let userStub;
        let saveStub
        let bcryptStub;
        let existingUserStub;

        let newUser;

        beforeEach(() => {
            userStub = sinon.stub(User.prototype, "constructor")
            saveStub = sinon.stub(User.prototype, "save");
            bcryptStub = sinon.stub(bcrypt, "hashSync").returns("encryptedPassword")
            existingUserStub = sinon.stub(User, "findOne");

            newUser = {"email": "user@example.com",
                        "password": "password1!"}
        })

        afterEach(() => {
            sinon.restore();
        })

        it("should call save and return the result when a valid User is added ", async () => {
            // Arrange
            const newUserDoc = {
                "email": "user@example.com",
                "password": "encryptedPassword",
            }
            userStub.returns(newUserDoc)
            saveStub.returns(newUserDoc)
            // Act
            const result = await userService.addNewUser(newUser)
            // Assert
            expect(result).to.contain(newUserDoc);
        })
        
        it("should throw an error when save fails", async () => {
            // Arrange
            const invalidUser = { email: "" };
            const error = new Error("Invalid new user")
            saveStub.throws(error)

            // Act // Assert
            try {
                await userService.addNewUser(invalidUser);
                expect.fail("Expected error was not thrown")
            } catch (e) {
                expect(e.message).to.equal(error.message);
            } 
        })

        it("should throw an error when the user's email is already in the database", async () => {
            // Arrange
            const error = new Error("User with this email already exists")
            existingUserStub.throws(error)
            // Act // Assert
            try {
                await userService.addNewUser(newUser);
                expect.fail("Expected error was not thrown")
            } catch (e) {
                expect(e.message).to.equal(error.message);
            } 
        })
    })

    describe("loginUser service tests", () => {
        let findUserStub;
        let bcryptStub;
        let jwtStub;

        beforeEach(() => {
            findUserStub = sinon.stub(User, "findOne")
            bcryptStub = sinon.stub(bcrypt, "compareSync")
            jwtStub = sinon.stub(jwt, "sign").returns("accessToken")
        })

        afterEach(() => {
            sinon.restore();
        })

        it("should throw internal system error if call to database fails to respond", async () => {
            // Arrange
            const invalidUser = {
                email: "email3@email.com",
                password: "password1!"
             };
            const error = new Error("Internal system error")
            findUserStub.throws(error)
            // Act // Assert
            try {
                await userService.loginUser(invalidUser)
                expect.fail("Expected error was not thrown")
            } catch (e) {
                expect(e.message).to.equal(error.message);
            }
        })

        it("should throw user not found in database error if email doesn't match any existing users", async () => {
            // Arrange
            const invalidUser = {
                email: "email3@email.com",
                password: "password1!"
            };
            const error = new Error("User not found in database")
            findUserStub.returns(null)
            // Act // Assert
            try {
                await userService.loginUser(invalidUser);
                expect.fail("Expected error was not thrown")
            } catch (e) {
                expect(e.message).to.equal(error.message);
            }
        })

        it("should return a null access token if username doesn't match email", async () => {
            // Arrange
            const invalidUser = {
                email: "email3@email.com",
                password: "password1!"
            };
            findUserStub.returns({})
            bcryptStub.returns(false);
            // Act
            const response = await userService.loginUser(invalidUser)
            // Assert
            expect(response.accessToken).to.equal(null)
        })
    })

})