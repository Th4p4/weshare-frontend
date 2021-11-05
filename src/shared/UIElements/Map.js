import React, { useRef , useEffect} from "react";

// import {GoogleMap, useLoadScript} from "react-google-maps/api";


import './Map.css';
// const google = window.google 

const Map = props => {
    
    
    const mapRef = useRef();
    const { center, zoom } = props;
    // const googled = google;
    useEffect(() => {
        
        const map = new window.google.maps.Map(mapRef.current, { center: center, zoom: zoom });
        new window.google.maps.Marker({
            position: center,
            map: map,
        });
        // console.log(center)
    }, [center, zoom])
 

    return <div ref={mapRef} className={`map ${props.className}`} style={props.style}></div>
};

export default Map;