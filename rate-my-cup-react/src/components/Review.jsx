import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import "../css/Review.css"
import CoffeeService from "../services/CoffeeService.js"
import InfoFormatter from "../utils/InfoFormatter.js"

const Review = ({ review }) => {
    
    const role = localStorage.getItem("role")

    const [locationDetails, setLocationDetails] = useState("")

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

    return (
        <div className='row m-3'>
            <div className="rounded mb-3 w-100 fs-5 text-start" id="review-box">
                <div>Location: <Link to={`/location/${review.locationId}`}>{locationDetails.name}</Link></div>
                <div className='fw-light'>{review.drinkType}</div>
                <div>Rating: {"★".repeat(review.rating)}</div>
                <div className='fw-light'>Price: {"£".repeat(review.price)}</div>
                {review.comment && <div >{review.comment}</div>}
                {(role==="admin" || review.userId === localStorage.getItem("id")) && <Link id="edit-button">Edit</Link>}
            </div>
        </div>
    )
}

export default Review