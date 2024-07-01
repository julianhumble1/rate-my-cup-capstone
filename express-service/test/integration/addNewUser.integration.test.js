import { expect } from "chai"
import supertest from "supertest"

import Config from "../../src/config/Config.js"
import Database from "../../src/db/Database.js"
import Server from "../../src/server/Server.js"
import User from "../../src/models/User.model.js"
import UserController from "../../src/controllers/User.controller.js"
import UserRoutes from "../../src/routes/User.routes.js"
import UserService from "../../src/services/User.service.js"

import CoffeeRoutes from "../../src/routes/Coffee.routes.js"
const coffeeRoutes = new CoffeeRoutes();
import ReviewRoutes from "../../src/routes/Review.routes.js"
const reviewRoutes = new ReviewRoutes()

import generateTestData from "../data/testUsers.js"
const { testUsers, newUser } = await generateTestData();

describe("addNewUser integration tests", () => {
    let userServer;
    let userService;
    let database;
    let request;

    before(async () => {
        Config.load();
        const { PORT, HOST, DB_URI } = process.env;
        userService = new UserService();
        const userController = new UserController(userService);
        const userRoutes = new UserRoutes(userController);
        database = new Database(DB_URI);
        await database.connect();
        userServer = new Server(PORT, HOST, userRoutes, coffeeRoutes, reviewRoutes);
        userServer.start();
        request = supertest(userServer.getApp())
    })

    after(async () => {
        await userServer.close();
        await database.close();
    })

    beforeEach(async () => {
        try {
            await User.deleteMany();
            console.log("Database cleared")
        } catch (e) {
            console.log(e.message);
            console.log("Error clearing");
            throw new Error();
        }

        try {
            await User.insertMany(testUsers);
            console.log("Database populated with test users");
        } catch (e) {
            console.log(e.message);
            console.log("Error inserting");
            throw new Error();
        }
    })

    describe("POST requests to '/user/register' on userRoutes", () => {
        it("should response with a 201 status code if successful", async () => {
            // Arrange
            // Act
            const response = await request.post("/user/register").send(newUser);
            // Assert
            expect(response.status).to.equal(201);
        })

        it("should respond with the created user if successful", async () => {
            // Arrange
            // Act
            const response = await request.post("/user/register").send(newUser);
            // Assert
            expect(response.body.email).to.equal(newUser.email);
        })

        it("should respond with a 400 status code if email is already in database", async () => {
            // Arrange
            const invalidUser = {...newUser, email: "user1@example.com"}
            // Act
            const response = await request.post("/user/register").send(invalidUser);
            // Assert
            expect(response.status).to.equal(400)
        })

        it("should respond with response code 400 if bad request - invalid email", async () => {
            // Arrange
            const invalidUser = { ...newUser, email: "email" }
            // Act
            const response = await request.post("/user/register").send(invalidUser);
            // Assert
            expect(response.status).to.equal(400);
        })

        it("should respond with response code 400 if bad request - no email", async () => {
            // Arrange
            const invalidUser = { ...newUser }
            delete invalidUser.email;
            // Act
            const response = await request.post("/user/register").send(invalidUser);
            // Assert
            expect(response.status).to.equal(400);
        })

        it("should respond with response code 400 if bad request - invalid password", async () => {
            // Arrange
            const invalidUser = { ...newUser, password: "password" }
            // Act
            const response = await request.post("/user/register").send(invalidUser);
            // Assert
            expect(response.status).to.equal(400);
        })

        it("should respond with response code 400 if bad request - no password", async () => {
            // Arrange
            const invalidUser = { ...newUser }
            delete invalidUser.password;
            // Act
            const response = await request.post("/user/register").send(invalidUser);
            // Assert
            expect(response.status).to.equal(400);
        })
    })
})