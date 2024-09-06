import React from "react";
import Medical from "../../assets/icons/medical.png";
import Fire from "../../assets/icons/fire.png";
import Disaster from "../../assets/icons/Natural.png";
import Accident from "../../assets/icons/Accident.png";
import Violence from "../../assets/icons/Violence.png";
import Rescue from "../../assets/icons/Rescue.png";
import EmergencyType from "../../components/EmergencyType";
import Grid from "@mui/material/Grid2";
export default function TypeOfEmergencySection() {
  const emergencyType = [
    {
      icon: <img src={Medical} alt="icon" />,
      title: "Medical",
    },
    {
      icon: <img src={Fire} alt="icon" />,
      title: "Fire",
    },
    {
      icon: <img src={Disaster} alt="icon" />,
      title: "Natural disaster",
    },
    {
      icon: <img src={Accident} alt="icon" />,
      title: "Accident",
    },
    {
      icon: <img src={Violence} alt="icon" />,
      title: "Violence",
    },
    {
      icon: <img src={Rescue} alt="icon" />,
      title: "Rescue",
    },
  ];

  return (
    <div>
      <h1>Type of emergency</h1>
      <Grid container spacing={2}>
        {emergencyType.map((item) => (
          <Grid size="auto">
            <EmergencyType icon={item.icon} title={item.title} />
          </Grid>
        ))}
      </Grid>
    </div>
  );
}
