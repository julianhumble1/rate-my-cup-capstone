import { Router } from "express"

export default class UserRoutes {

    #router;
    #routeStartPoint;

    constructor(routeStartPoint = "/") {
        this.#routeStartPoint = routeStartPoint;
        this.#router = new Router();
        this.#initialiseRoutes();
    }

    #initialiseRoutes = () => {

       this.#router.use((req, res, next) => {
            res.header(`Access-Control-Allow-Headers`, `x-access-token, Origin, Content-Type, Accept`);
            next();
       }); 
        
        this.#router.post(
            "/",
            (req, res) => {res.status(200).json("success")}
        )
    }

    getRouter = () => {
        return this.#router
    }

    getRouteStartPoint = () => {
        return this.#routeStartPoint
    }
}