import axios from "axios"

const API_URL = import.meta.env.VITE_APP_COFFEE_URL

export default class CoffeeService {
    static locationSearch = async (postcode) => {
        try {
            const response = await axios.get(`${API_URL}/location`, { params: { "postcode": postcode } })
            return response.data
        } catch (error) {
            throw new Error(error.message)
        };
    }
}

