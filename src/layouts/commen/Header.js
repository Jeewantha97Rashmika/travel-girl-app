import { Box, Typography } from "@mui/material";
import React from "react";
import NotificationsActiveIcon from "@mui/icons-material/NotificationsActive";
export default function Header({ title }) {
  return (
    <div>
      <Box
        sx={{
          backgroundColor: "#F5F5FA",
          height: "30px",
          display: "flex",
          padding: "20px",
          justifyContent: "space-between",
          alignItems: "center",
          mb: 2,
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
          {title}
        </Typography>

        <NotificationsActiveIcon />
      </Box>
    </div>
  );
}
