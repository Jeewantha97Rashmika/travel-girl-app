import { Container } from "@mui/material";
import React from "react";
import GoogleMapComponent from "../google_map/GoogleMapComponent";
import Header from "./commen/Header";

export default function LocationLayout() {
  return (
    <div
      style={{
        width: "430px",
      }}
    >
      <Header title="Explore Location" />
      <Container>
        <GoogleMapComponent />
      </Container>
    </div>
  );
}
