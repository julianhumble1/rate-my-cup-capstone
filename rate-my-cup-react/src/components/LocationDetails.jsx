import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import "../css/LocationDetails.css"
import CoffeeService from "../services/CoffeeService.js"
import InfoFormatter from "../utils/InfoFormatter.js"

const LocationDetails = () => {

    const locationID = useParams().id;

    const [loading, setLoading] = useState(true)

    const [locationInfo, setLocationInfo] = useState()

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await CoffeeService.getLocationDetails(locationID)
                const formatted = InfoFormatter.formatLocationResults(response)
                setLocationInfo(formatted)
            } catch (e) {
                console.log(e)
            } finally {
                setLoading(false)
            }
        }
        fetchData();
    }, [locationID])


   return (
       <div className="container text-center rounded-2 pb-3" id="location-box">
           {!loading && <>
               <div className="fs-2 fw-bold">{locationInfo.name}</div>
                    <div className="row">
                        <div className=" col-3">
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
                    <div className="col-9 pe-0 justify-content-center">
                        <div className="row w-100 h-50 ">
                           <div className="col-8 h-100 p-1 pt-0">
                               <div className="boxes rounded h-100 align-content-center">
                                    <div className = "fs-3 h-50">&#9733;&#9733;&#9733;&#9733;</div>
                                    <div>(36 Rates)</div>
                               </div>
                            </div>
                            <div className="col-4 align-content-center">
                                <button className="btn btn-outline-dark" id="rate-a-cup-here">
                                    Rate a cup at this location
                                </button>
                            </div>
                        </div>
                        <div className="row w-100 h-50 justify-content-center">
                           <div className="col-4 p-1 pb-0">
                               <div className="boxes rounded align-content-center fw-bold h-100">£££</div>
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
           </>}
    </div>
  )
}

export default LocationDetails