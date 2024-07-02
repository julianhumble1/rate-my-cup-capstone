import { Router } from "express";
import AuthJWT from "../middleware/AuthJWT.js"

import ReviewController from "../controllers/Review.controller.js";
import ReviewValidator from "../middleware/ReviewValidator.js";

export default class ReviewRoutes {

    #router;
    #routeStartPoint;
    #controller;

    constructor(controller = new ReviewController(), routeStartPoint = "/review") {
        this.#routeStartPoint = routeStartPoint;
        this.#router = new Router();
        this.#controller = controller;
        this.#initialiseRoutes();
    }

    #initialiseRoutes = () => {

        this.#router.use((req, res, next) => {
            res.header(`Access-Control-Allow-Headers`, `x-access-token, Origin, Content-Type, Accept`);
            next();
        }); 
        
        this.#router.post(
            "/new",
            [AuthJWT.verifyToken, ...ReviewValidator.validateNewReview()],
            this.#controller.addNewReview
        )

        this.#router.get(
            "/location?",
            this.#controller.getReviewsByLocation
        )

        this.#router.put(
            "/",
            [AuthJWT.verifyToken]
        )
     }

    getRouter = () => {
        return this.#router
    }

    getRouteStartPoint = () => {
        return this.#routeStartPoint
    }

}