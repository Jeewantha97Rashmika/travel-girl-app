import React, { useState, useEffect } from "react";
import { GoogleMap, LoadScript, Marker } from "@react-google-maps/api";

const containerStyle = {
  width: "100%",
  height: "700px",
};

const LiveLocationGoogleMap = () => {
  const [location, setLocation] = useState({ lat: null, lng: null });
  const [error, setError] = useState(null);

  useEffect(() => {
    if ("geolocation" in navigator) {
      navigator.geolocation.watchPosition(
        (position) => {
          setLocation({
            lat: position.coords.latitude,
            lng: position.coords.longitude,
          });
        },
        (error) => {
          setError(error.message);
        }
      );
    } else {
      setError("Geolocation is not supported by this browser.");
    }
  }, []);

  return (
    <div>
      <h2>Live Location Detector with Google Maps</h2>
      {error ? (
        <p>Error: {error}</p>
      ) : location.lat && location.lng ? (
        <LoadScript googleMapsApiKey="AIzaSyAGfdDJb8-nWY26M_nou5q6ASUuJFQJ5fU">
          <GoogleMap
            mapContainerStyle={containerStyle}
            center={location}
            zoom={15}
          >
            <Marker position={location} />
          </GoogleMap>
        </LoadScript>
      ) : (
        <p>Fetching location...</p>
      )}
    </div>
  );
};

export default LiveLocationGoogleMap;
