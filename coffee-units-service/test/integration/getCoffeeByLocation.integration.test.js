import { expect } from "chai"
import supertest from "supertest"

import Config from "../../src/config/Config.js"
import Database from "../../src/db/Database.js"
import Server from "../../src/server/Server.js"
import CoffeeController from "../../src/controllers/Coffee.controller.js"
import CoffeeRoutes from "../../src/routes/Coffee.routes.js"
import CoffeeService from "../../src/services/Coffee.service.js"

describe("getCoffeeByLocation integration tests", () => {
    let coffeeServer;
    let coffeeService;
    let database;
    let request;


    before(async () => {
        Config.load();
        const { PORT, HOST, DB_URI } = process.env;
        coffeeService = new CoffeeService();
        const coffeeController = new CoffeeController(coffeeService)
        const coffeeRoutes = new CoffeeRoutes(coffeeController);
        database = new Database(DB_URI);
        await database.connect();
        coffeeServer = new Server(PORT, HOST, coffeeRoutes)
        coffeeServer.start();
        request = supertest(coffeeServer.getApp())
    })

    after(async () => {
        await coffeeServer.close();
        await database.close();
    })

    describe("GET requests to '/coffee/location' on coffeeRoutes", () => {
        it("should respond with a 201 status code if successful", async () => {
            // Arrange
            const validPostcode = {
                "postcode": "tw18 2df"
            }
            // Act
            const response = await request.get("/coffee/location").send(validPostcode)
            // Assert
            expect(response.status).to.equal(201);
        })

        it("should respond with 20 objects in response body", async () => {
            // Arrange
            const validPostcode = {
                "postcode": "tw18 2df"
            }
            // Act
            const response = await request.get("/coffee/location").send(validPostcode)
            // Assert
            console.log(response)
            expect(response.body.length).to.equal(20);
        })
    })


})