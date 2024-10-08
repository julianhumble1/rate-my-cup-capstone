import "../css/SearchResult.css"
import { Link } from "react-router-dom"
import { useEffect, useState } from "react"
import ReviewService from "../services/ReviewService.js"
import ReviewDataFormatter from "../utils/ReviewDataFormatter.js"

const SearchResult = ({ locationInfo, priceFilter, ratingFilter, drinkFilter }) => {

    const locationId = locationInfo.id

    const [locationRating, setLocationRating] = useState()
    const [locationPrice, setLocationPrice] = useState()
    
    const [matchesFilters, setMatchesFilters] = useState(true)

    useEffect(() => {
        const fetchReviewData = async () => {
            try {
                const responseData = await ReviewService.getAllLocationReviews(locationId);
                if (drinkFilter === "Any") {
                    const rating = ReviewDataFormatter.calculateAverageRating(responseData)
                    const price = ReviewDataFormatter.calculateModePrice(responseData)
                    setLocationRating(rating)
                    setLocationPrice(price)
                } else {
                    const drinkReviews = ReviewDataFormatter.arrangeReviewsByDrink(responseData)[drinkFilter]
                    const rating = ReviewDataFormatter.calculateAverageRating(drinkReviews)
                    const price = ReviewDataFormatter.calculateModePrice(drinkReviews)
                    setLocationRating(rating)
                    setLocationPrice(price)
                }
            } catch (e) {
                console.log(e);
                return null;
            }
        };

        fetchReviewData()
    }, [locationId, drinkFilter])

    useEffect(() => {
        if (priceFilter === "Any" && ratingFilter === "Any") {
            setMatchesFilters(true)
            return
        }
        if (locationPrice > priceFilter || locationPrice === 0 || locationRating < ratingFilter) {
            setMatchesFilters(false)
        } else {
            setMatchesFilters(true)
        }
    }, [priceFilter, ratingFilter, locationRating, locationPrice])

    return (
    <>
        {matchesFilters &&

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
        }
    </>
  )
}

export default SearchResult