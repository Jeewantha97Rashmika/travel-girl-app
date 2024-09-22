import React from "react";
import { Box, Container, Typography } from "@mui/material";

export default function ContactCard() {
  return (
    <div>
      <Box
        sx={{
          display: "flex",
          flexDirection: "row",
          gap: "10px",
          padding: "10px",
          minWidth: "365px",
          backgroundColor: "#F5F5FA",
          borderRadius: "20px",
        }}
      >
        <Box
          sx={{
            width: "50px",
            height: "50px",
            borderRadius: "50%",
            backgroundColor: "red",
          }}
        ></Box>
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            textAlign: "left",
          }}
        >
          <Typography
            sx={{
              fontSize: "16px",
              fontWeight: "bold",
              textAlign: "left",
              color: "#000000",
            }}
          >
            Mother
          </Typography>
          <Typography
            sx={{
              fontSize: "14px",
              textAlign: "left",
              color: "#000000",
            }}
          >
            07552345678
          </Typography>
        </Box>
      </Box>
    </div>
  );
}
