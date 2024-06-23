import UserService from "../services/User.service.js"

export default class UserController {

    #service;

    constructor(service = new UserService()) {
        this.#service = service
    }

    addNewUser = async (req, res) => {
        try {
            const newUser = await this.#service.addNewUser(req.body)
            return res.status(201).json(newUser)
        } catch (error) {
            return res.status(500).json("Internal server error")
        }
    }

}