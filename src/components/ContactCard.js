import React from "react";
import { Box, Container, Typography } from "@mui/material";
import Grid from "@mui/material/Grid2";
export default function ContactCard({ name, tpNumber }) {
  return (
    <Box
      sx={{
        padding: "10px",
        backgroundColor: "#F5F5FA",
        borderRadius: "20px",
        marginBottom: "20px",
      }}
    >
      <Grid container>
        <Grid size={3}>
          <Box
            sx={{
              width: "50px",
              height: "50px",
              borderRadius: "50%",
              backgroundColor: "red",
            }}
          ></Box>
        </Grid>
        <Grid size={6}>
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
              {name}
            </Typography>
            <Typography
              sx={{
                fontSize: "14px",
                textAlign: "left",
                color: "#000000",
              }}
            >
              {tpNumber}
            </Typography>
          </Box>
        </Grid>
      </Grid>
    </Box>
  );
}
