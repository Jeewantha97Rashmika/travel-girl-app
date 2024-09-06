import React from "react";
import Chip from "@mui/material/Chip";
export default function EmergencyType({ icon, title }) {
  return (
    <div onClick={() => console.log(title)}>
      <Chip icon={icon} label={title} variant="outlined"
       />
    </div>
  );
}
