import User from "../models/User.model.js";
import bcrypt from "bcrypt"

export default class UserService {

    addNewUser = async (newUser) => {
        let user;
        try {
            await this.#checkEmailTaken(newUser.email)
            user = new User({
                email: newUser.email,
                password: bcrypt.hashSync(newUser.password, 8)
            })
        } catch (e) {
            throw new Error(e.message);
        }
        return await user.save();
    }

    #checkEmailTaken = async (email) => {
        const existingUser = await User.findOne({ email: email })
        if (existingUser) {
            throw new Error("User with this email already exists")
        }
    }

}