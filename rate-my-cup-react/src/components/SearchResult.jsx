import "../css/SearchResult.css"
import { Link } from "react-router-dom"
import { useEffect, useState } from "react"
import ReviewService from "../services/ReviewService.js"
import ReviewDataFormatter from "../utils/ReviewDataFormatter.js"

const SearchResult = ({ locationInfo }) => {

    const locationId = locationInfo.id

    const [locationRating, setLocationRating] = useState()

    useEffect(() => {
        const fetchReviewData = async () => {
            try {
                const responseData = await ReviewService.getAllLocationReviews(locationId);
                const rating = ReviewDataFormatter.calculateAverageRating(responseData)
                setLocationRating(rating)
            } catch (e) {
                console.log(e);
                return null;
            }
        };

        fetchReviewData()
    }, [locationId])

    return (
      <div className="container justify-content-center rounded-3 mt-3" id="result-box" data-testid="search-result">
            <div className="row p-2 row-cols-2">
                <div className="col">
                    <div className="row ps-3 text-start fw-bold">
                        <Link to={`/location/${locationInfo.id}`} className="location-name ps-0">
                            {locationInfo.name}   
                        </Link>
                    </div>
                    <div className="row ps-3 text-start">
                        {locationInfo.address}
                    </div>
            </div>
                <div className="text-end align-content-center fs-4">
                    {locationRating > 0 && <div>
                        {"★".repeat(locationRating)}
                    </div>}
                    {locationRating === 0 && <div>
                        No Rates Yet
                    </div>}
            </div>    
        </div>
      </div>
  )
}

export default SearchResult