import { useEffect, useState } from "react"
import { useParams, Link } from "react-router-dom"
import "../css/LocationDetails.css"
import CoffeeService from "../services/CoffeeService.js"
import ReviewService from "../services/ReviewService.js"
import InfoFormatter from "../utils/InfoFormatter.js"
import ReviewDataFormatter from "../utils/ReviewDataFormatter.js"

const LocationDetails = () => {

    const locationId = useParams().id;
    const [loading, setLoading] = useState(true)

    const [locationInfo, setLocationInfo] = useState()
    const [locationInfoError, setLocationInfoError] = useState("")

    const [reviewData, setReviewData] = useState()

    useEffect(() => {
        const fetchLocationData = async () => {
            try {
                const response = await CoffeeService.getLocationDetails(locationId)
                const formatted = InfoFormatter.formatLocationResults(response)
                setLocationInfo(formatted)
            } catch (e) {
                setLocationInfoError(e.message)
            } 
        }

        const fetchReviewData = async () => {
            try {
                
                const responseData = await ReviewService.getAllLocationReviews(locationId)
                setReviewData(responseData)
            } catch (e) {
                console.log(e)
            } finally {
                setLoading(false)
            }
        }

        fetchLocationData();
        fetchReviewData();
        
    }, [locationId])


   return (
       <div className="container text-center rounded-2 pb-3 justify-content-center" id="location-box">
           {!loading && <>
               <div className="fs-2 fw-bold">{locationInfo.name}</div>
               {locationInfoError &&
                    <div className="text-danger">{locationInfoError}</div>}
                    <div className="row justify-content-center">
                        <div className="col-3 d-none d-md-block ">
                            <div className="rounded boxes h-100 ">
                                <div>Opening Hours</div>
                                {locationInfo.openingHours !== "N/A" &&
                                    <div>{locationInfo.openingHours.map((dayInfo, index) => {
                                        const day = Object.keys(dayInfo);
                                        const hours = dayInfo[day]
                                        return (
                                            <div key={index}>
                                                <strong>{day}:</strong> {hours}
                                            </div>
                                        );
                                    })}</div>
                                }
                                {locationInfo.openingHours === "N/A" && <div>
                                    Unavailable
                                </div>
                                }
                            </div>
                       </div>
                    <div className="col-md-9 col-12 pe-0 ">
                        <div className="row w-100 h-50">
                           <div className="col-8 h-100 p-1 pt-0">
                               <div className="boxes rounded h-100 align-content-center">
                                   <div className="fs-3 h-50">{"★".repeat(ReviewDataFormatter.calculateAverageRating(reviewData))}</div>
                                    <div>({reviewData.length} Rates)</div>
                               </div>
                            </div>
                            <div className="col align-content-center ">
                                <Link to={`/rate/new/${locationId}`} className="btn btn-outline-dark col-12" id="rate-a-cup-here">
                                    Rate a cup at this location
                                </Link>
                            </div>
                        </div>
                        <div className="row w-100 h-50 justify-content-center">
                           <div className="col-4 p-1 pb-0">
                               <div className="boxes rounded align-content-center fw-bold h-100">{"£".repeat(ReviewDataFormatter.calculateModePrice(reviewData)) }</div>
                           </div>
                           <div className="col-8 p-1 pb-0">
                               <div className="boxes rounded align-content-center h-100"> 
                                    <div>
                                        Website: <a href={`https://${locationInfo.url}`}>{locationInfo.url}</a>
                                    </div>
                                    <div>
                                        Phone Number: {locationInfo.phone}
                                    </div> 
                               </div>
                            </div>
                        </div>      
                   </div>
                </div>
                <div className="row justify-content-center p-md-3 pt-4 m-1">
                    <div className="boxes rounded p-2">
                        Address: {locationInfo.address}
                    </div>
                </div>
           </>}
    </div>
  )
}

export default LocationDetails