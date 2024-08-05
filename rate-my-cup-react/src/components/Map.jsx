import { useEffect, useState, useRef } from "react"

const Map = () => {

    const [xCoords, setXCoords] = useState();
    const [yCoords, setYCoords] = useState();

    const mapElement = useRef(null)

    const setCoords = (longitude, latitude) => {
        setXCoords(longitude)
        setYCoords(latitude)
    }

    useEffect(() => {
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition((position) => (setCoords(position.coords.latitude, position.coords.longitude)))
        } else {
            setCoords("not found")
        }
    }, [])

    useEffect(() => {
        const script = document.createElement("script")
        script.src = "https://api.tomtom.com/maps-sdk-for-web/cdn/6.x/6.0.15/maps/maps-web.min.js"
        script.async = true
        script.onload = () => {
            const tt = window.tt
            tt.map({
                key: "sT17166UsrgptIJQcPeXqLcIb6EgnlNe",
                container: mapElement.current
            })
        }

        document.body.appendChild(script)

        return () => {
          document.body.removeChild(script);
        };
    }, [])

    return (
      <div>
            <div>X Co-ordinates: { xCoords }</div>
            <div>Y Co-ordinates: {yCoords} </div>
            <div id="map" ref={mapElement} style={{ width: '100vw', height: '100vh' }} />;
      </div>
  )
}

export default Map