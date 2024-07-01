import { expect } from "chai"
import supertest from "supertest"

import Config from "../../src/config/Config.js"
import Database from "../../src/db/Database.js"
import Server from "../../src/server/Server.js"
import Review from "../../src/models/Review.model.js"
import ReviewController from "../../src/controllers/Review.controller.js"
import ReviewRoutes from "../../src/routes/ReviewRoutes.js"
import ReviewService from "../../src/services/Review.service.js"

import generateTestData from "../data/testReviews.js"
const { testReviews } = generateTestData();

describe("getReviewsByLocation integration tests", () => {
    let reviewServer;
    let reviewService;
    let database;
    let request;

    before(async () => {
        Config.load();
        const { PORT, HOST, DB_URI } = process.env;
        reviewService = new ReviewService()
        const reviewController = new ReviewController(reviewService);
        const reviewRoutes = new ReviewRoutes(reviewController);
        database = new Database(DB_URI);
        await database.connect();
        reviewServer = new Server(PORT, HOST, reviewRoutes)
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

    describe("GET requests to /review/location on reviewRoutes", () => {
        it("should respond with 200 status code if successful", async () => {
            // Arrange
            // Act
            const response = await request.get(`/review/location?locationId=Q-WhI_pokyksoCGaVEvxaQ`)
            // Assert
            expect(response.status).to.equal(200)
        })

        it("should respond with array of single result if only one result", async () => {
            // Arrange
            // Act
            const response = await request.get(`/review/location?locationId=Q-WhI_pokyksoCGaVEvxaQ`)
            // Assert
            expect(response.body).to.deep.equal([testReviews[0]])
        })

        it("should respond with array of multiple results if multiple results", async () => {
            // Arrange
            // Act
            const response = await request.get(`/review/location?locationId=nqvi2tr9SV6hE1ZshBVSQg`)
            // Assert
            expect(response.body).to.deep.equal([testReviews[1], testReviews[2]])
        })

        it("should respond with an empty array if no results", async () => {
            // Arrange
            // Act
            const response = await request.get(`/review/location?locationId=nonLocationId`)
            // Assert
            expect(response.body).to.deep.equal([])
        })

        it("should respond with code 400 if not locationId provided", async () => {
            // Arrange
            // Act
            const response = await request.get(`/review/location?`)
            // Assert
            expect(response.status).to.equal(400)
        })
    })
})