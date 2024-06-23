import { Router } from "express"
import UserController from "../controllers/User.controller.js";
import UserValidator from "../middleware/UserValidator.js";
export default class UserRoutes {

    #router;
    #routeStartPoint;
    #controller

    constructor(controller = new UserController(), routeStartPoint = "/") {
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
            "/",
            [...UserValidator.validateEmail(), ...UserValidator.validatePassword()],
            this.#controller.addNewUser
        )
    }

    getRouter = () => {
        return this.#router
    }

    getRouteStartPoint = () => {
        return this.#routeStartPoint
    }
}