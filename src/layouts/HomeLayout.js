import React from "react";
import { Box, Container, Typography } from "@mui/material";
import Grid from "@mui/material/Grid2";
import HomeImage from "../assets/images/homeImage.png";
import SosButton from "../components/SosButton";
import TypeOfEmergencySection from "./home/TypeOfEmergencySection";

export default function HomeLayout() {
  return (
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
        <SosButton />
      </Box>
      <Box>
        <TypeOfEmergencySection />
      </Box>
      <Box sx={{
        width: "100%",
      }}>

   
      </Box>
    </Container>
  );
}
