import axios from "axios"

const API_URL = import.meta.env.VITE_APP_USER_URL

export default class UserService {

    static register = async (email, password) => {
        try {
            const response = await axios.post(`${API_URL}/register`, { email, password })
            return response.data;
        } catch (error) {
            throw new Error(error.response.data)
        }
    }
}