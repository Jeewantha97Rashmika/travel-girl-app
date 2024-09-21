import React, { useState, useEffect } from "react";
import { GoogleMap, LoadScript, Marker } from "@react-google-maps/api";
import { Button } from "@mui/material";

// Example of a custom map style (from Snazzy Maps)
const mapStyles = [
  {
    featureType: "all",
    elementType: "geometry",
    stylers: [{ color: "#202c3e" }],
  },
  {
    featureType: "all",
    elementType: "labels.text.fill",
    stylers: [{ color: "#746855" }],
  },
  // Add more styles as needed
];

const containerStyle = {
  width: "100%",
  height: "600px",
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

  const handleShareLocation = () => {
    const locationUrl = `https://www.google.com/maps?q=${location.lat},${location.lng}`;

    // Check if the Web Share API is supported
    if (navigator.share) {
      navigator
        .share({
          title: "My Live Location",
          text: "Here is my live location!",
          url: locationUrl,
        })
        .catch((error) => console.error("Error sharing:", error));
    } else {
      // Fallback: Copy link to clipboard
      navigator.clipboard.writeText(locationUrl).then(() => {
        alert("Location link copied to clipboard!");
      });
    }
  };

  return (
    <div
     
    >
      {error ? (
        <p>Error: {error}</p>
      ) : location.lat && location.lng ? (
        <>
          <LoadScript googleMapsApiKey="AIzaSyAGfdDJb8-nWY26M_nou5q6ASUuJFQJ5fU">
            <GoogleMap
              mapContainerStyle={containerStyle}
              center={location}
              zoom={15}
              options={{ styles: mapStyles }} // Apply custom styles here
            >
              <Marker position={location} />
            </GoogleMap>
          </LoadScript>
<br/>
          <Button variant="contained"sx={{
            backgroundColor: "black",
            color: "white",
            borderRadius: "20px",
            textTransform: "none",
            width:{xs:"100%",sm:"200px"},
            "&:hover": {
              backgroundColor: "white",
              color: "black",
            },
          }} onClick={handleShareLocation}>
            Share My Location
          </Button>
        </>
      ) : (
        <p>Fetching location...</p>
      )}
    </div>
  );
};

export default LiveLocationGoogleMap;
