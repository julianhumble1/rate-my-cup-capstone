import axios from "axios"

const API_URL = import.meta.env.VITE_APP_COFFEE_URL
const TOMTOM_API_KEY = import.meta.env.VITE_TOMTOM_API_KEY

export default class CoffeeService {
    static locationSearch = async (postcode) => {
        try {
            const response = await axios.get(`${API_URL}/location?postcode=${postcode}`)
            console.log(response)
            return response.data
        } catch (error) {
            throw new Error(error.message)
        };
    }

    static searchByCoords = async () => {
        try {
            const coords = await this.getCoords()
            console.log(`The coordinates are ${coords}`)
            console.log(`X: ${coords[0]}`)
            const response = await axios.get(`https://api.tomtom.com/search/2/categorySearch/.json?key=${TOMTOM_API_KEY}&geobias=point:${coords[0]},${coords[1]}&limit=30&categorySet=9376002,9376006,9361018`)
            const formattedLocationList = this.formatLocationList(response.data.results)
            return formattedLocationList
        } catch (e) {
            throw new Error(e.message)
        }
    }

    static getCoords = () => {
        return new Promise((resolve, reject) => {
            if (navigator.geolocation) {
                navigator.geolocation.getCurrentPosition(
                    (position) => {
                        resolve([position.coords.latitude, position.coords.longitude])
                    },
                    (error) => {
                        reject(new Error("Change your browser settings to allow geolocation"))
                    }
                )
            } else {
                reject(new Error("Geolocation not supported"))
            }
        })
    }

    static getLocationDetails = async (id) => {
        try {
            const response = await axios.get(`https://api.tomtom.com/search/2/place.json?entityId=${id}&key=${TOMTOM_API_KEY}&apiVersion=1&openingHours=nextSevenDays`)
            return response.data.results[0]
        } catch (error) {
            throw new Error(error.message)
        }
    }

    static formatLocationList = (locationList) => {
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
}

