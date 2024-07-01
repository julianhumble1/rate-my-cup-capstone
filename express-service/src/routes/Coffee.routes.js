import { Router } from "express";

import CoffeeValidator from "../middleware/CoffeeValidator.js";
import CoffeeController from "../controllers/Coffee.controller.js";

export default class CoffeeRoutes {

    #router;
    #routeStartPoint;
    #controller;

    constructor(controller = new CoffeeController(), routeStartPoint = "/coffee") {
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
        
        this.#router.get(
            "/location?",
            [...CoffeeValidator.validatePostcode()],
            this.#controller.getCoffeeByLocation
        )

     }

    getRouter = () => {
        return this.#router
    }

    getRouteStartPoint = () => {
        return this.#routeStartPoint
    }

}