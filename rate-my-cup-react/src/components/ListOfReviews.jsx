import { useParams } from "react-router-dom";
import ReviewService from "../services/ReviewService.js";
import ReviewDataFormatter from "../utils/ReviewDataFormatter.js"
import Review from "./Review.jsx";

import { useState, useEffect } from "react";

import "../css/ListOfReviews.css"

const ListOfReviews = () => {
    
    const locationId = useParams().locationId;
    const drinkType = useParams().drinkType;
    const drinkOptions = ["Latte", "Espresso", "Americano", "Cappuccino", "Mocha", "Flat White", "Tea", "Other"]

    const [loading, setLoading] = useState(true)

    const [reviewData, setReviewData] = useState()

    useEffect(() => {
        const fetchReviewData = async () => {
            try {
                const responseData = await ReviewService.getAllLocationReviews(locationId)
                if (drinkOptions.includes(drinkType)) {
                    const drinkReviews = ReviewDataFormatter.arrangeReviewsByDrink(responseData)[drinkType]
                    setReviewData(drinkReviews)
                } else {
                    setReviewData(responseData)
                }
            } catch (e) {
                console.log(e);
                setReviewData(null)
            } finally {
                setLoading(false)
            }
        }
        fetchReviewData();
    }, [locationId])

    return (
        (!loading && 
            <div className="container rounded text-center fw-bold fs-2 p-0 justify-content-center" id="list-of-reviews-box">
                {(drinkOptions.includes(drinkType)) &&
                    <div>{drinkType} Reviews</div>
                }
                {!(drinkOptions.includes(drinkType)) &&
                    <div>All Reviews</div>
                }
                {reviewData && reviewData.map((review, index) => (
                    <Review review={review} key={index} />
                ))

                }
            </div>
        )
    )
}

export default ListOfReviews