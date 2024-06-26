import CoffeeService from "../services/Coffee.service.js";
import CoffeeValidator from "../middleware/CoffeeValidator.js";

export default class CoffeeController {

    #service;

    constructor(service = new CoffeeService()) {
        this.#service = service
    }

    getCoffeeByLocation = async (req, res) => {
        const sentResponse = CoffeeValidator.handleValidationErrors(req, res)
        if (sentResponse) return;
        try {
            await this.#service.getCoffeeByLocation(req.body.postcode)
        } catch (error) {
            console.log(error)
        }
    }

}