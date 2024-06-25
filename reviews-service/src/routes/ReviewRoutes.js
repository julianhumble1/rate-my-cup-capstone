import { Router } from "express";

export default class ReviewRoutes {

    #router;
    #routeStartPoint;

    constructor(routeStartPoint = "/review") {
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