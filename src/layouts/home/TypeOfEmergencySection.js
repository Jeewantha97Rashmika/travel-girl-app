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
      tpNumber: "1919",
    },
    {
      icon: <img src={Fire} alt="icon" />,
      title: "Fire",
      tpNumber: "0112422222",
    },
    {
      icon: <img src={Disaster} alt="icon" />,
      title: "Natural disaster",
      tpNumber: "0112421052",
    },
    {
      icon: <img src={Accident} alt="icon" />,
      title: "Accident",
      tpNumber: "0112691111",
    },
    {
      icon: <img src={Violence} alt="icon" />,
      title: "Violence",
      tpNumber: "0115717171",
    },
    {
      icon: <img src={Rescue} alt="icon" />,
      title: "Rescue",
      tpNumber: "110",
    },
  ];

  return (
    <div>
      <h1>Type of emergency</h1>
      <Grid container spacing={2}>
        {emergencyType.map((item) => (
          <Grid size="auto">
            <a href={`tel:${item.tpNumber}`}>
              <EmergencyType icon={item.icon} title={item.title} />
            </a>
          </Grid>
        ))}
      </Grid>
    </div>
  );
}
