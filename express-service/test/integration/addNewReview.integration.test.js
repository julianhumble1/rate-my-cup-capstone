import { expect } from "chai"
import supertest from "supertest"

import Config from "../../src/config/Config.js"
import Database from "../../src/db/Database.js"
import Server from "../../src/server/Server.js"
import Review from "../../src/models/Review.model.js"
import ReviewController from "../../src/controllers/Review.controller.js"
import ReviewRoutes from "../../src/routes/Review.routes.js"
import ReviewService from "../../src/services/Review.service.js"

import UserRoutes from "../../src/routes/User.routes.js"
const userRoutes = new UserRoutes()
import CoffeeRoutes from "../../src/routes/Coffee.routes.js"
const coffeeRoutes = new CoffeeRoutes();

import generateTestData from "../data/testReviews.js"
const { testReviews, newReview } = generateTestData();

describe("addNewReview integration tests", () => {
    let reviewServer;
    let reviewService;
    let database;
    let request;
    const accessToken = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY2ODNiMjZjMDllOGQyODc4OTFjZWQ5NyIsImlhdCI6MTcyMDAxMjM4MiwiZXhwIjoxNzIwMDk4NzgyfQ.bi-pnXYXoGt13V_4lnpHz5Uaepvmw6t6ji2ntrgzl7c"

    before(async () => {
        Config.load();
        const { PORT, HOST, DB_URI } = process.env;
        reviewService = new ReviewService()
        const reviewController = new ReviewController(reviewService);
        const reviewRoutes = new ReviewRoutes(reviewController);
        database = new Database(DB_URI);
        await database.connect();
        reviewServer = new Server(PORT, HOST, userRoutes, coffeeRoutes, reviewRoutes)
        reviewServer.start();
        request = supertest(reviewServer.getApp());
    })

    after(async () => {
        await reviewServer.close();
        await database.close(); 
    })

    beforeEach(async () => {
        try {
            await Review.deleteMany();
            console.log("Database cleared")
        } catch (e) {
            console.log(e.message);
            console.log("Error clearing");
            throw new Error();
        }

        try {
            await Review.insertMany(testReviews)
            console.log("Database populated with test reviews")
        } catch (e) {
            console.log(e.message);
            console.log("Error inserting")
            throw new Error();
        }
    })

    describe("POST requests to /review/new on reviewRoutes", () => {
        it("should respond with 201 status code if successful", async () => {
            // Arrange
            // Act
            const response = await request.post("/review/new").set("x-access-token",accessToken).send(newReview)
            // Assert
            expect(response.status).to.equal(201);
        })

        it("should respond with the created review if successful", async () => {
            // Arrange
            // Act
            const response = await request.post("/review/new").set("x-access-token",accessToken).send(newReview)
            // Assert
            expect(response.body.drinkType).to.equal("Mocha");
        })

        it("should respond with code 400 if bad request - no drinkType", async () => {
            // Arrange
            const invalidReview = { ...newReview }
            delete invalidReview.drinkType;
            // Act
            const response = await request.post("/review/new").set("x-access-token",accessToken).send(invalidReview)
            // Assert
            expect(response.status).to.equal(400);
        })

        it("should respond with code 400 if bad request - invalid drinkType", async () => {
            // Arrange
            const invalidReview = { ...newReview, drinkType: "badDrink" }
            // Act
            const response = await request.post("/review/new").set("x-access-token",accessToken).send(invalidReview)
            // Assert
            expect(response.status).to.equal(400);
        })

        it("should respond with code 400 if bad request - no rating", async () => {
            // Arrange
            const invalidReview = { ...newReview }
            delete invalidReview.rating;
            // Act
            const response = await request.post("/review/new").set("x-access-token",accessToken).send(invalidReview)
            // Assert
            expect(response.status).to.equal(400);
        })

        it("should respond with code 400 if bad request - invalid rating", async () => {
            // Arrange
            const invalidReview = { ...newReview, rating: 6 }
            // Act
            const response = await request.post("/review/new").set("x-access-token",accessToken).send(invalidReview)
            // Assert
            expect(response.status).to.equal(400);
        })

        it("should respond with code 400 if bad request - no price", async () => {
            // Arrange
            const invalidReview = { ...newReview }
            delete invalidReview.price;
            // Act
            const response = await request.post("/review/new").set("x-access-token",accessToken).send(invalidReview)
            // Assert
            expect(response.status).to.equal(400);
        })

        it("should respond with code 400 if bad request - invalid price", async () => {
            // Arrange
            const invalidReview = { ...newReview, price: 4 }
            // Act
            const response = await request.post("/review/new").set("x-access-token",accessToken).send(invalidReview)
            // Assert
            expect(response.status).to.equal(400);
        })

        it("should respond with code 400 if bad request - invalid comment", async () => {
            // Arrange
            const invalidReview = { ...newReview, comment: 123 }
            // Act
            const response = await request.post("/review/new").set("x-access-token",accessToken).send(invalidReview)
            // Assert
            expect(response.status).to.equal(400);
        })
    })
})