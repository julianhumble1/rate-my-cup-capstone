import "../css/DrinkReviewsSummary.css"
import ReviewDataFormatter from "../utils/ReviewDataFormatter.js"

const DrinkReviewsSummary = ({ drinkType, reviewData }) => {

    const sortedReviewData = ReviewDataFormatter.arrangeReviewsByDrink(reviewData)
    const reviewsArray = sortedReviewData[drinkType]

    return (
        <div className="pb-2">
            <div id="review-summary-box" className="rounded justify-content-center align-items-center h-100 container">
                <div className="row justify-content-center fw-bold fs-4">
                    {drinkType}
                </div>
                {reviewsArray.length > 0 &&
                <div className="row justify-content-center">
                    <div className="fs-3">{"★".repeat(ReviewDataFormatter.calculateAverageRating(reviewsArray))}</div>
                        <div className="fw-bold justify-content-center">{"£".repeat(ReviewDataFormatter.calculateModePrice(reviewsArray))}</div>    
                    <div className="justify-content-center">{reviewsArray.length} rate(s)</div>
                </div>
                }
                {reviewsArray.length === 0 && <>
                    <div>No Rates Yet!</div>
                </>}
            </div>
        </div>
  )
}

export default DrinkReviewsSummary