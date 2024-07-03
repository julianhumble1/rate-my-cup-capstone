import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import "../css/Review.css"
import CoffeeService from "../services/CoffeeService.js"
import InfoFormatter from "../utils/InfoFormatter.js"
import ReviewService from '../services/ReviewService.js'

const Review = ({ review }) => {
    
    const role = localStorage.getItem("role")

    const [locationDetails, setLocationDetails] = useState("")
    const [showEdit, setShowEdit] = useState(false)

    const drinkOptions = ["Latte", "Espresso", "Americano", "Cappuccino", "Mocha", "Flat White", "Tea", "Other"]
    const ratings = [1, 2, 3, 4, 5];
    const prices = [1, 2, 3];

    const [drinkType, setDrinkType] = useState("")
    const [rating, setRating] = useState()
    const [price, setPrice] = useState()
    const [comment, setComment] = useState("")

    const [successfulEdit, setSuccessfulEdit] = useState("")

    useEffect(() => {
        const fetchLocationData = async () => {
            try {
                const response = await CoffeeService.getLocationDetails(review.locationId);
                const formatted = InfoFormatter.formatLocationResults(response);
                setLocationDetails(formatted)
            } catch (e) {
                return null; 
            }
        };

        fetchLocationData()
    }, [review])

    const handleEdit = async (e) => {
        e.preventDefault()
        try {
            console.log("submitted")
            await ReviewService.editReview(drinkType, rating, price, comment, review._id, review.userId, localStorage.getItem("accessToken"))
            console.log("successful")
            setSuccessfulEdit("Rate successfully edited")
        } catch (e){
            console.log("failed")
            console.log(e)
            setSuccessfulEdit(e.message)
        }
    }

    return (
        <div className='row m-3'>
            <div className="rounded mb-3 w-100 fs-5 text-start" id="review-box">
                <div>Location: <Link to={`/location/${review.locationId}`}>{locationDetails.name}</Link></div>
                <div className='fw-light'>{review.drinkType}</div>
                <div>Rating: {"★".repeat(review.rating)}</div>
                <div className='fw-light'>Price: {"£".repeat(review.price)}</div>
                {review.comment && <div >{review.comment}</div>}
                {(role === "admin" || review.userId === localStorage.getItem("id")) && <button id="edit-button" className="btn p-0" onClick={(e) => setShowEdit(true)}>Edit</button>}
                {showEdit && <>
                    <div className="row">
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
                    <div>Additional Comments</div>
                    <div className=" mb-3 justify-content-center row">
                        <div className="col-12 col-md-9">
                            <input type="text" className="form-control" onChange={(e) => setComment(e.target.value) } />
                        </div>
                        <div className="col-md-3 col-8 text-center">
                            <button className="btn " id="submit-button" disabled={!drinkType || !rating || !price} onClick={handleEdit}>
                                Edit this Rate!
                            </button>
                        </div>
                    </div>
                </>}
                {successfulEdit === "Rate successfully edited" && 
                    <div className='text-center text-success'>{successfulEdit}</div>
                }
                {(successfulEdit && (successfulEdit !== "Rate successfully edited")) &&
                    <div className='text-center text-danger'>{successfulEdit}</div>
                }
            </div>
        </div>
    )
}

export default Review