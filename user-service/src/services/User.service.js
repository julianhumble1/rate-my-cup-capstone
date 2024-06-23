import User from "../models/User.model.js";
import bcrypt from "bcrypt"

export default class UserService {
    
    addNewUser = async (newUser) => {
        let user;
        try {
            user = new User({
                email: newUser.email,
                password: bcrypt.hashSync(newUser.password, 8)
            })
        } catch (e) {
            throw new Error("Invalid new user");
        }
        return await user.save();
    }

}