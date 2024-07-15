import axios from "axios"

export default class CoffeeService {

    TOMTOM_API_KEY = process.env.TOMTOM_API_KEY

    getCoordsFromPostcode = async (postcode) => {
        let coords;
        try {
            const response = await axios.get(`https://api.tomtom.com/maps/orbis/places/geocode/${postcode}.json?key=${this.TOMTOM_API_KEY}&apiVersion=1`)
            coords = response.data.results[0].position
            return coords
        } catch (error) {
            throw new Error("Failed to convert postcode to coordinates")
        } 
    }

    getCoffeeByLocation = async (postcode) => {
        try {
            const coords = await this.getCoordsFromPostcode(postcode)
            const response = await axios.get(`https://api.tomtom.com/search/2/categorySearch/.json?key=${this.TOMTOM_API_KEY}&geobias=point:${coords.lat},${coords.lon}&limit=30&categorySet=9376002,9376006,9361018`)
            const resultsList = response.data.results;
            return resultsList
        } catch (e) {
            if (e.message === "Failed to convert postcode to coordinates") {
                throw new Error(e.message)
            } else {
                throw new Error("Failed to obtain coffee shop list from coordinates")
            }
        }
    }

}