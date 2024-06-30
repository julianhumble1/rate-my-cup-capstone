import "../css/NewRate.css"

import { useState } from "react";
import ReviewService from "../services/ReviewService.js";
import { useParams, Link } from "react-router-dom";

const NewRate = () => {

    const drinkOptions = ["Latte", "Espresso", "Americano", "Cappuccino", "Mocha", "Flat White", "Tea", "Other"]
    const ratings = [1, 2, 3, 4, 5];
    const prices = [1, 2, 3];

    const locationParams = useParams().locationId

    const [drinkType, setDrinkType] = useState("")
    const [rating, setRating] = useState()
    const [price, setPrice] = useState()
    const [comment, setComment] = useState("")
    const [locationId, setLocationId] = useState(locationParams)

    const [successfulCreate, setSuccessfulCreate] = useState("")

    const handleSubmit = async (event) => {
        event.preventDefault();
        try {
            await ReviewService.newReview(locationId, drinkType, rating, price, comment, localStorage.getItem("accessToken"))
            setSuccessfulCreate("New Rate successfully created!")
        } catch (e) {
            setSuccessfulCreate(e.message)
        }
    }

    return (
    <div className="rounded-2 text-center justify-content-center p-2" id="new-rate-box">
        {(successfulCreate !== "New Rate successfully created!") && <>  
            <div className="fs-3 fw-bold">New Rate</div>
            <div className="fw-bold">Location:</div>
            <div className="row justify-content-center align-items-center fw-bold pb-2">
                <div className="col-6 justify-content-center">
                    {/* <input type="text" className="form-control" placeholder="Location..." onChange={(e) => setLocationId(e.target.value)}/> */}
                    {locationId}
                </div>    
            </div>
            <div className="row">
                <div className="d-none d-md-block col-md-4 ">
                    <label htmlFor="Drink">Drink Type</label>
                </div>
                <div className="d-none d-md-block col-md-4">
                    <label htmlFor="Price">Rating</label>
                </div>
                <div className="d-none d-md-block col-md-4">
                    <label htmlFor="Rating">Price</label>
                </div>
            </div>
            <form onSubmit={handleSubmit}> 
                <div className="row mb-3" >
                    <div className = "col-12 col-md-4 mb-2 m-md-0 ">
                        <select className="form-select" id="drink-choice" required defaultValue={""} onChange={(e) => setDrinkType(e.target.value)} data-testid="drink-choice">
                            <option value="" disabled>Drink Type</option>
                            {drinkOptions.map((drinkOption, index) => (
                            <option key={index} value={drinkOption}>{drinkOption}</option>
                            ))}
                        </select>
                    </div>
                    <div className="col-12 col-md-4 mb-2 m-md-0">
                            <select className="form-select" id="rating-choice" required defaultValue={""} onChange={(e) => setRating(e.target.value)} data-testid="rating-choice">
                            <option value="" disabled >Rating</option>
                            {ratings.map((rating, index) => (
                                <option key={index} value={rating}>{"★".repeat(rating)}</option>
                            ))}
                        </select>
                    </div>
                    <div className="col-12 col-md-4 mb-2 m-md-0">
                        <select className="form-select" id="price-choice" required defaultValue={""} onChange={(e) => setPrice(e.target.value)} data-testid="price-choice">
                            <option value="" disabled>Price</option>
                            {prices.map((price, index) => (
                                <option key={index} value={price}>{"£".repeat(price)}</option>
                            ))}
                        </select>
                    </div>
                    </div>
                    <div className="row">
                        <div>Additional Comments</div>
                    </div>
                    <div className="row mb-3 justify-content-center">
                        <div className="col-12 col-md-6">
                            <input type="text" className="form-control" onChange={(e) => setComment(e.target.value) } />
                        </div>
                    </div>
                <div className="row justify-content-center">
                    <button className="btn col-8" id="submit-button" disabled={!drinkType || !rating || !price}>
                        Submit my Rate!
                    </button>
                </div>  
            </form>
        </>}
        {(successfulCreate === "New Rate successfully created!") && <>
            <div className="text-success fw-bold fs-4">{successfulCreate}</div>
            <div>
                <Link to={`/location/${locationId}`}>Click here to go back to the coffee shop </Link>
            </div>
            or
            <div>
                <Link to="/home"> Click here to return to the home page</Link>    
            </div>
        </>}
        {(successfulCreate !== ("" || "New Rate successfully created!")) &&
                <div className="text-danger">{successfulCreate}</div>
        }    
    </div>
  )
}

export default NewRate