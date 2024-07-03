import "../css/Home.css"
import CoffeeService from "../services/CoffeeService.js"
import SearchResult from "./SearchResult.jsx"
import { useState } from "react"

const Home = () => {

  let response;
  const [locationResults, setLocationResults] = useState(null)

  const [postcodeSearch, setPostcodeSearch] = useState("")
  const [postcodeError, setPostcodeError] = useState("")

  const [loading, setLoading] = useState(false)

  const handleSearch = async () => {
    try {
      response = await CoffeeService.locationSearch(postcodeSearch)
      setPostcodeError("")
      setLocationResults(response)
    } catch (e) {
      if (e.message === "Request failed with status code 400") {
        setPostcodeError("Invalid postcode. Please ensure postcode is valid before trying again")
      } else setPostcodeError(e.message)
    }
  }

  return (
    <div className = "container text-center rounded-2 pb-3" id="search-box">
      <h1>Find your cup...</h1>
      <div className="row justify-content-center">
        <div className="col-8 col-md-4 pb-md-4 pb-0">
          <input type="text" id="postcode-box" className="form-control" placeholder="Postcode" onChange={(e) => setPostcodeSearch(e.target.value)}/>
        </div>
      </div>
      <div className="row pt-3 pt-md-0">
        <div className="d-none d-md-block col-md-4 ">
          <label htmlFor="coffee-choice">Drink Type</label>
        </div>
        <div className="d-none d-md-block col-md-4">
          <label htmlFor="min-rating-choice">Min Rating</label>
        </div>
        <div className="d-none d-md-block col-md-4">
          <label htmlFor="min-price-choice">Price</label>
        </div>
      </div>
      <form>
        <div className = "row mb-3">
        <div className = "col-12 col-md-4 mb-2 m-md-0">
          <select className="form-select" id="coffee-choice" defaultValue = "Any">
            <option value="Any">Any Drink Type</option>
            <option value="Latte">Latte</option>
            <option value="Espresso">Espresso</option>
            <option value="Mocha">Mocha</option>
          </select>
        </div>
        <div className="col-12 col-md-4 mb-2 m-md-0">
          <select className="form-select" id="min-rating-choice" defaultValue = "Any">
            <option value = "Any">Any Rating</option>
            <option value="1">&#9733;</option>
            <option value="2">&#9733;&#9733;</option>
            <option value="3">&#9733;&#9733;&#9733;</option>
            <option value="4">&#9733;&#9733;&#9733;&#9733;</option>
            <option value="5">&#9733;&#9733;&#9733;&#9733;&#9733;</option>
          </select>
        </div>
        <div className="col-12 col-md-4 mb-2 m-md-0">
          <select className="form-select" id="price-rating-choice" defaultValue = "Any">
            <option value = "Any">Any Price</option>
            <option value="1">£</option>
            <option value="2">£/££</option>
            <option value="3">£/££/£££</option>
          </select>
          </div>
        </div>
        <div className="row justify-content-center">
          <div className="col-12 col-md-6 ">
            <button type="button" className="btn btn-outline-dark col-10 col-md-12" id="search-button" data-testid="location-search-button" onClick={handleSearch}>Find My Cup!</button>
            {postcodeError && <div className="text-danger">
              {postcodeError}
            </div>}
          </div>
        </div>
      </form>
      <div className="row p-4 justify-content-center">
        <div className="col-md-6 col-12 text-center fs-3 ">
          Or search for a specific cafe...
        </div>
        <div className="col-md-6 col-12 text-center row justify-content-center">
          <div className="col-md-8 col-12">
            <input type="text" className="form-control" placeholder="Search..."/>
          </div>
          <div className="col-md-4 col-6 pt-2 pt-md-0 justify-content-center">
            <button className="btn d-block w-100" type="button" id="search-by-name-button">Find My Cup!</button>
          </div>
        </div>
      </div>
      {loading &&
      <div>Loading...</div>
      }
      {locationResults &&
        locationResults.map((locationInfo, index) => (
        <SearchResult locationInfo={locationInfo} key={index} />
        ))
      }
    </div>
  )
}

export default Home