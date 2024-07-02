import axios from "axios"

const API_URL = import.meta.env.VITE_APP_COFFEE_URL
const TOMTOM_API_KEY = import.meta.env.VITE_TOMTOM_API_KEY

export default class CoffeeService {
    static locationSearch = async (postcode) => {
        try {
            const response = await axios.get(`${API_URL}/location?postcode=${postcode}`)
            return response.data
        } catch (error) {
            throw new Error(error.message)
        };
    }

    static getLocationDetails = async (id) => {
        try {
            const response = await axios.get(`https://api.tomtom.com/search/2/place.json?entityId=${id}&key=${TOMTOM_API_KEY}&apiVersion=1&openingHours=nextSevenDays`)
            return response.data.results[0]
        } catch (error) {
            throw new Error(error.message)
        }
    }
}

