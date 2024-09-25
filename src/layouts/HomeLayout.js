import React from "react";
import { Box, Container, Typography } from "@mui/material";
import Grid from "@mui/material/Grid2";
import HomeImage from "../assets/images/homeImage.png";
import SosButton from "../components/SosButton";
import TypeOfEmergencySection from "./home/TypeOfEmergencySection";
import Header from "./commen/Header";
import { useState, useEffect } from "react";
export default function HomeLayout() {
  const [location, setLocation] = useState({ lat: null, lng: null });
  const [error, setError] = useState(null);
  console.log(error);

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
    <div>
      <Header title="Welcome to Travel Girl" />

      <Container>
        <Box>
          <Grid container spacing={2}>
            <Grid size={6}>
              <Typography
                sx={{
                  fontSize: "22px",
                  fontWeight: "bold",
                  textAlign: "left",
                  color: "#000000",
                }}
              >
                Are you in an emergency?
              </Typography>
              <Typography
                sx={{
                  fontSize: "15px",
                  textAlign: "left",
                }}
              >
                Press the SOS button, your live location will be shared wih the
                nearest help centre and your emergency contacts
              </Typography>
            </Grid>
            <Grid size={6}>
              <img src={HomeImage} alt="HomeImage" />
            </Grid>
          </Grid>
        </Box>
        <Box
          sx={{
            mt: 4,
            backgroundColor: "#F5F5FA",
            width: "100%",
            height: "15rem",
            borderRadius: "1rem",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <SosButton handleShareLocation={handleShareLocation} />
        </Box>
        <Box>
          <TypeOfEmergencySection />
        </Box>
        <Box
          sx={{
            width: "100%",
          }}
        ></Box>
      </Container>
    </div>
  );
}
