import UserService from "../services/User.service.js"
import UserValidator from "../middleware/UserValidator.js";

export default class UserController {

    #service;

    constructor(service = new UserService()) {
        this.#service = service
    }

    addNewUser = async (req, res) => {
        const sentResponse = UserValidator.handleValidationErrors(req, res)
        if (sentResponse) return;
        try {
            const newUser = await this.#service.addNewUser(req.body)
            return res.status(201).json(newUser)
        } catch (error) {
            return res.status(500).json(error.message)
        }
    }

}