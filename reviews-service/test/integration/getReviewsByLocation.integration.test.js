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
        it("should respond with 201 status code if successful", async () => {
            // Arrange
            // Act
            const response = await request.get(`/review/location?locationId=Q-WhI_pokyksoCGaVEvxaQ`)
            // Assert
            expect(response.status).to.equal(201)
        })
    })
})