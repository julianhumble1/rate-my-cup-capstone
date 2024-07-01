import express from "express";
import cors from "cors"

export default class Server {
    #app;
    #port;
    #host;

    // #router;

    #userRouter
    #coffeeRouter
    // #reviewRouter

    #server;

    constructor(port, host, userRouter, coffeeRouter) {
        this.#app = express();
        this.#port = port;
        this.#host = host;
        this.#userRouter = userRouter;
        this.#coffeeRouter = coffeeRouter;
        this.#server = null;
    }

    start = () => {
        this.#server = this.#app.listen(this.#port, this.#host, () => {
            console.log(`Server is listening on http://${this.#host}:${this.#port}`)
        })

        this.#app.use(cors())
        this.#app.use(express.json())
        // this.#app.use(
        //     this.#router.getRouteStartPoint(),
        //     this.#router.getRouter()
        // )
        this.#app.use(
            this.#userRouter.getRouteStartPoint(),
            this.#userRouter.getRouter()
        )
        this.#app.use(
            this.#coffeeRouter.getRouteStartPoint(),
            this.#coffeeRouter.getRouter()
        )
    }

    close = () => {
        this.#server?.close();
    }

    getApp = () => {
        return this.#app
    }
}