import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { BottomNavigation, BottomNavigationAction, Paper } from "@mui/material";
import RestoreIcon from "@mui/icons-material/Restore";
import AccountBoxIcon from "@mui/icons-material/AccountBox";
import NotListedLocationIcon from "@mui/icons-material/NotListedLocation";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
export default function FixedBottomNavigation() {
  const [value, setValue] = useState(0);
  const navigate = useNavigate(); // Use useNavigate to programmatically navigate

  const handleNavigation = (newValue) => {
    setValue(newValue);
    if (newValue === 0) {
      navigate("/home");
    } else if (newValue === 1) {
      navigate("/my_circle");
    } else if (newValue === 2) {
      navigate("/location");
    } else if (newValue === 3) {
      navigate("/profile");
    }
  };

  return (
    <Paper
      sx={{ position: "fixed", bottom: 0, left: 0, right: 0 }}
      elevation={3}
    >
      <BottomNavigation
        showLabels
        value={value}
        onChange={(event, newValue) => handleNavigation(newValue)}
      >
        <BottomNavigationAction label="Home" icon={<RestoreIcon />} />
        <BottomNavigationAction label="My circel" icon={<AccountBoxIcon />} />
        <BottomNavigationAction
          label="Location"
          icon={<NotListedLocationIcon />}
        />
        <BottomNavigationAction label="Profile" icon={<AccountCircleIcon />} />
      </BottomNavigation>
    </Paper>
  );
}
