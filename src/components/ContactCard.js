import React from "react";
import { Box, Typography, Avatar, IconButton } from "@mui/material";
import Grid from "@mui/material/Grid2";
import DeleteIcon from "@mui/icons-material/Delete";
import PhoneIcon from "@mui/icons-material/Phone";

export default function ContactCard({ name, tpNumber, photoURL, onDelete }) {
  return (
    <Box
      sx={{
        padding: "10px",
        backgroundColor: "#F5F5FA",
        borderRadius: "20px",
        marginBottom: "20px",
      }}
    >
      <Grid container alignItems="center">
        <Grid size={3}>
          <Avatar
            src={photoURL}
            alt={name}
            sx={{ width: 56, height: 56, marginRight: "16px" }}
          />
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
              <a
                href={`tel:${tpNumber}`}
                style={{ textDecoration: "none", color: "#000000" }}
              >
                {tpNumber}
              </a>
            </Typography>
          </Box>
        </Grid>
        <Grid
          size={3}
          sx={{
            display: "flex",
            justifyContent: "flex-end",
          }}
        >
          {/* Call Icon */}
          <IconButton href={`tel:${tpNumber}`} aria-label="call">
            <PhoneIcon sx={{ color: "#000000" }} />
          </IconButton>
          {/* Delete Icon */}
          <IconButton onClick={onDelete} aria-label="delete">
            <DeleteIcon sx={{ color: "#FF0000" }} />
          </IconButton>
        </Grid>
      </Grid>
    </Box>
  );
}
