import User from "../models/User.model.js";
import bcrypt from "bcrypt"
import jwt from "jsonwebtoken"

export default class UserService {

    addNewUser = async (newUser) => {
        let user;
        try {
            await this.#checkEmailTaken(newUser.email)
            if (!newUser.role) {
                user = new User({
                    email: newUser.email,
                    password: bcrypt.hashSync(newUser.password, 8)
                })  
            } else {
                user = new User({
                    email: newUser.email,
                    password: bcrypt.hashSync(newUser.password, 8),
                    role: newUser.role
                }) 
            }
        } catch (e) {
            if (e.message === "User with this email already exists") {
                throw new Error(e.message)
            } else {
                throw new Error("Internal system error");
            }
        }
        return await user.save();
    }

    loginUser = async ({ email, password }) => {
        let user;
        try {
            user = await User.findOne({ email: email })
        } catch (e) {
            throw new Error("Internal system error")
        }

        if (!user) {
            throw new Error("User not found in database")
        }

        const passwordsMatch = bcrypt.compareSync(password, user.password);
        if (!passwordsMatch) {
            return {
                accessToken : null
            }
        }

        const token = jwt.sign({ id: user.id }, process.env.SECRET, { expiresIn: 86400 })
        return {
            id: user.id,
            email: user.email,
            role: user.role,
            accessToken: token
        }

    } 

    #checkEmailTaken = async (email) => {
        const existingUser = await User.findOne({ email: email })
        if (existingUser) {
            throw new Error("User with this email already exists")
        }
    }
}