import "../css/Home.css"
import CoffeeService from "../services/CoffeeService.js"
import SearchResult from "./SearchResult.jsx"
import { useEffect, useState } from "react"

const Home = () => {

  let response;
  const [locationResults, setLocationResults] = useState(null)

  const [postcodeSearch, setPostcodeSearch] = useState("")
  const [postcodeError, setPostcodeError] = useState("")

  const [loading, setLoading] = useState(false)

  const [priceFilter, setPriceFilter] = useState("Any")
  const [ratingFilter, setRatingFilter] = useState("Any")
  const [drinkFilter, setDrinkFilter] = useState("Any")

  const [currentLocationError, setCurrentLocationError] = useState("")

  const drinkOptions = ["Latte", "Espresso", "Americano", "Cappuccino", "Mocha", "Flat White", "Tea", "Other"]

  const handleChangePrice = (event) => {
    event.preventDefault()
    setPriceFilter(event.target.value)
  }

  const handleChangeRating = (event) => {
    event.preventDefault()
    setRatingFilter(event.target.value)
  }

  useEffect(() => {
    if (priceFilter === "Any" && ratingFilter === "Any") {
      setDrinkFilter("Any")
    }
  }, [priceFilter, ratingFilter])

  const handleSearch = async () => {
    setLoading(true)
    setCurrentLocationError("")
    try {
      response = await CoffeeService.locationSearch(postcodeSearch)
      setPostcodeError("")
      setLocationResults(response)
    } catch (e) {
      if (e.message === "Request failed with status code 400") {
        setPostcodeError("Invalid postcode. Please ensure postcode is valid before trying again")
      } else {
        setPostcodeError(e.message) 
      }
    }
    setLoading(false)
  }

  const handleUseCurrentLocation = async () => {
    setLoading(true)
    setPostcodeError("")
    try {
      const response = await CoffeeService.searchByCoords()
      setLocationResults(response)
    } catch (e) {
      setCurrentLocationError(e.message)
    }
    setLoading(false)
  }

  return (
    <div className = "container text-center rounded-2 pb-3" id="search-box">
      <h1>Find your cup...</h1>
      <div className="row justify-content-center">
        <div className="col-8 col-md-4 pb-2 pb-md-0">
          <input type="text" id="postcode-box" className="form-control" placeholder="Postcode" onChange={(e) => setPostcodeSearch(e.target.value)}/>
        </div>
         <button type="button" className="btn btn-outline-dark col-6 col-md-4" id="search-button" data-testid="location-search-button" onClick={handleSearch}>Find My Cup by Postcode!</button>
        {postcodeError && <div className="text-danger">
          {postcodeError}
        </div>}
      </div>
      <div className="">
        Or
      </div>
      <div className="row justify-content-center">
        <div className="col-md-3 col-9">
          <button type="button" className="btn w-100" id="use-current-location" onClick={handleUseCurrentLocation}>Use Current Location!</button>
        </div>
        {currentLocationError && <div className="text-danger">{ currentLocationError }</div>}
      </div>
      <form>
        <div className="row pt-3">
          <div className="d-none d-md-block col-md-4">
            <label htmlFor="min-price-choice">Price</label>
          </div>
          <div className="d-none d-md-block col-md-4">
            <label htmlFor="min-rating-choice">Min Rating</label>
          </div>
          <div className="d-none d-md-block col-md-4 ">
            <label htmlFor="coffee-choice">Drink Type</label>
          </div>
        </div>
        <div className = "row mb-3">
        <div className = "col-12 col-md-4 mb-2 m-md-0">
          <select className="form-select" id="price-rating-choice" defaultValue = "Any" onChange={handleChangePrice}>
            <option value="Any">Any Price</option>
            <option value="1">£</option>
            <option value="2">£/££</option>
            <option value="3">£/££/£££</option>
          </select>
        </div>
        <div className="col-12 col-md-4 mb-2 m-md-0">
          <select className="form-select" id="min-rating-choice" defaultValue = "Any" onChange={handleChangeRating}>
            <option value="Any">Any Rating</option>
            <option value="1">&#9733;</option>
            <option value="2">&#9733;&#9733;</option>
            <option value="3">&#9733;&#9733;&#9733;</option>
            <option value="4">&#9733;&#9733;&#9733;&#9733;</option>
            <option value="5">&#9733;&#9733;&#9733;&#9733;&#9733;</option>
          </select>
        </div>
          <div className="col-12 col-md-4 mb-2 m-md-0">
            <select className="form-select" id="coffee-choice" value={drinkFilter} disabled={((ratingFilter !== "Any"|| priceFilter !== "Any") ) ? false : true} onChange={(e)=>setDrinkFilter(e.target.value)}>
            <option value="Any">Any Drink Type</option>
            {drinkOptions.map((drinkOption, index) => (
              <option key={index} value={drinkOption}>{drinkOption}</option>
              ))}
          </select>
          
        </div>
        </div>
        
      </form>
      {loading &&
      <div>Loading...</div>
      }
      {locationResults &&
        locationResults.map((locationInfo, index) => (
          <SearchResult locationInfo={locationInfo} key={index} priceFilter={priceFilter} ratingFilter={ratingFilter} drinkFilter={drinkFilter}/>
        ))
      }
    </div>
  )
}

export default Home