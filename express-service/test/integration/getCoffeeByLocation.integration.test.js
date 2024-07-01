import { expect } from "chai"
import supertest from "supertest"

import Config from "../../src/config/Config.js"
import Server from "../../src/server/Server.js"
import CoffeeController from "../../src/controllers/Coffee.controller.js"
import CoffeeRoutes from "../../src/routes/Coffee.routes.js"
import CoffeeService from "../../src/services/Coffee.service.js"

import UserRoutes from "../../src/routes/User.routes.js"
const userRoutes = new UserRoutes()
import ReviewRoutes from "../../src/routes/Review.routes.js"
const reviewRoutes = new ReviewRoutes()

describe("getCoffeeByLocation integration tests", () => {

    let coffeeServer;
    let coffeeService;
    let request;

    before(async () => {
        Config.load();
        const { PORT, HOST, DB_URI } = process.env;
        coffeeService = new CoffeeService();
        const coffeeController = new CoffeeController(coffeeService)
        const coffeeRoutes = new CoffeeRoutes(coffeeController);
        coffeeServer = new Server(PORT, HOST, userRoutes, coffeeRoutes, reviewRoutes)
        coffeeServer.start();
        request = supertest(coffeeServer.getApp())
    })

    after(async () => {
        await coffeeServer.close();
    })

    describe("GET requests to '/coffee/location' on coffeeRoutes", () => {
        it("should respond with a 201 status code if successful", async () => {
            // Arrange
            const validPostcode = "tw18 2df"
            // Act
            const response = await request.get(`/coffee/location?postcode=${validPostcode}`)
            // Assert
            expect(response.status).to.equal(201);
        })

        it("should respond with 30 objects in response body if successful", async () => {
            // Arrange
            const validPostcode = "tw18 2df"
            // Act
            const response = await request.get(`/coffee/location?postcode=${validPostcode}`)
            // Assert
            expect(response.body.length).to.equal(30);
        })

        it("should respond with objects with id property if successful", async () => {
            // Arrange
            const validPostcode = "tw18 2df"
            // Act
            const response = await request.get(`/coffee/location?postcode=${validPostcode}`)
            // Assert
            expect(response.body[0].id).to.not.be.null;
        })

        it("should respond with objects with name property if successful", async () => {
            // Arrange
            const validPostcode = "tw18 2df"
            // Act
            const response = await request.get(`/coffee/location?postcode=${validPostcode}`)
            // Assert
            expect(response.body[0].name).to.not.be.null;
        })

        it("should respond with objects with address property if successful", async () => {
            // Arrange
            const validPostcode = "tw18 2df"
            // Act
            const response = await request.get(`/coffee/location?postcode=${validPostcode}`)
            // Assert
            expect(response.body[0].address).to.not.be.null;
        })
        
        it("should respond with status code 400 if invalid postcode is sent", async () => {
            // Arrange
            const invalidPostcode = "invalidPostcode"
            // Act
            const response = await request.get(`/coffee/location?postcode=${invalidPostcode}`)
            // Assert
            expect(response.status).to.equal(400);
        })

        it("should respond with status code 400 if no postcode is sent", async () => {
            // Arrange
            // Act
            const response = await request.get("/coffee/location")
            // Assert
            expect(response.status).to.equal(400);
        })
    })
})