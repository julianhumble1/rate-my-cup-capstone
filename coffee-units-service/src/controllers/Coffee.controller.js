import CoffeeService from "../services/Coffee.service.js";
import CoffeeValidator from "../middleware/CoffeeValidator.js";

export default class CoffeeController {

    #service;

    constructor(service = new CoffeeService()) {
        this.#service = service
    }

    formatLocationList = (locationList) => {
        let formattedLocationList = [];
        for (let i = 0; i < locationList.length; i++) {
            formattedLocationList.push({
                "id": locationList[i].id,
                "name": locationList[i].poi.name,
                "address": locationList[i].address.freeformAddress
            })
        }
        return formattedLocationList
    }

    getCoffeeByLocation = async (req, res) => {
        const sentResponse = CoffeeValidator.handleValidationErrors(req, res)
        if (sentResponse) return;
        let locationList;
        try {
            locationList = await this.#service.getCoffeeByLocation(req.body.postcode)
            const formattedLocationList = this.formatLocationList(locationList)
            return res.status(201).json(formattedLocationList)
        } catch (error) {
            return res.status(503).json(error.message)
        }
    }

}