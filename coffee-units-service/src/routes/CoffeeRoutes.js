import { Router } from "express";

export default class CoffeeRoutes {

    #router;
    #routeStartPoint;

    constructor(routeStartPoint = "/coffee") {
        this.#routeStartPoint = routeStartPoint;
        this.#router = new Router();
        this.#initialiseRoutes();
    }

    #initialiseRoutes = () => { }

    getRouter = () => {
        return this.#router
    }

    getRouteStartPoint = () => {
        return this.#routeStartPoint
    }

}