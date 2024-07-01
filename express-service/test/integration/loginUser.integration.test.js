import { expect } from "chai"
import sinon from "sinon"
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
const reviewRoutes = new ReviewRoutes();

import generateTestData from "../data/testUsers.js"
const { testUsers, loginUser, loginAdmin } = await generateTestData();

describe("loginUser integration tests", () => {

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
    
    describe("POST requests to '/user/login' on userRoutes", () => {
        it("should respond with 201 status code if successful", async () => {
            // Arrange
            // Act
            const response = await request.post("/user/login").send(loginUser)
            // Assert
            expect(response.status).to.equal(201);
        })

        it("should respond with accessToken if successful", async () => {
            // Arrange
            // Act
            const response = await request.post("/user/login").send(loginUser)
            // Assert
            expect(response.body.accessToken).not.to.equal(null)
        })

        it("should respond with user role if successful login to user", async () => {
            // Arrange
            // Act
            const response = await request.post("/user/login").send(loginUser)
            // Assert
            expect(response.body.role).to.equal("user")
        })

        it("should respond with admin role if successful login to admin", async () => {
            // Arrange
            // Act
            const response = await request.post("/user/login").send(loginAdmin)
            // Assert
            expect(response.body.role).to.equal("admin")
        })

        it("should respond with user id if successful", async () => {
            // Arrange
            // Act
            const response = await request.post("/user/login").send(loginUser)
            // Assert
            expect(response.body.id).to.equal("666ebf51cdf1cff8e67b6fc4")
        })

        it("should respond with user email if successful", async () => {
            // Arrange
            // Act
            const response = await request.post("/user/login").send(loginUser)
            // Assert
            expect(response.body.email).to.equal("user1@example.com")
        })

        it("should respond with 401 if password doesn't match email", async () => {
            // Arrange
            const invalidUser = { ...loginUser, password: "wrongPassword1!" }
            // Act
            const response = await request.post("/user/login").send(invalidUser)
            // Assert
            expect(response.status).to.equal(401)
        })

        it("should respond with 404 if email is not in database", async () => {
            // Arrange
            const invalidUser = { ...loginUser, email: "no@email.com" }
            // Act
            const response = await request.post("/user/login").send(invalidUser)
            // Assert
            expect(response.status).to.equal(404)
        })

        it("should respond with 400 if bad request - invalid email", async () => {
            // Arrange
            const invalidUser = { ...loginUser, email: "email" }
            // Act
            const response = await request.post("/user/login").send(invalidUser)
            // Assert
            expect(response.status).to.equal(400)
        })

        it("should respond with 400 if bad request - invalid password", async () => {
            // Arrange
            const invalidUser = { ...loginUser, password: "password" }
            // Act
            const response = await request.post("/user/login").send(invalidUser)
            // Assert
            expect(response.status).to.equal(400)
        })

        it("should respond with 400 if bad request - no email", async () => {
            // Arrange
            const invalidUser = { ...loginUser }
            delete invalidUser.email;
            // Act
            const response = await request.post("/user/login").send(invalidUser)
            // Assert
            expect(response.status).to.equal(400)
        })

        it("should respond with 400 if bad request - no password", async () => {
            // Arrange
            const invalidUser = { ...loginUser }
            delete invalidUser.password;
            // Act
            const response = await request.post("/user/login").send(invalidUser)
            // Assert
            expect(response.status).to.equal(400)
        })
    })

})