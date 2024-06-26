import { Router } from "express";

import CoffeeValidator from "../middleware/CoffeeValidator.js";

export default class CoffeeRoutes {

    #router;
    #routeStartPoint;

    constructor(routeStartPoint = "/coffee") {
        this.#routeStartPoint = routeStartPoint;
        this.#router = new Router();
        this.#initialiseRoutes();
    }

    #initialiseRoutes = () => {
        
        this.#router.use((req, res, next) => {
            res.header(`Access-Control-Allow-Headers`, `x-access-token, Origin, Content-Type, Accept`);
            next();
        }); 
        
        this.#router.get(
            "/location",
            ...CoffeeValidator.validatePostcode(),
        )

     }

    getRouter = () => {
        return this.#router
    }

    getRouteStartPoint = () => {
        return this.#routeStartPoint
    }

}