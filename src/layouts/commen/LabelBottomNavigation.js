import * as React from "react";
import BottomNavigation from "@mui/material/BottomNavigation";
import BottomNavigationAction from "@mui/material/BottomNavigationAction";
import FolderIcon from "@mui/icons-material/Folder";
import RestoreIcon from "@mui/icons-material/Restore";
import FavoriteIcon from "@mui/icons-material/Favorite";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import { useNavigate } from "react-router-dom";

export default function LabelBottomNavigation() {
    const [value, setValue] = React.useState("home");
    const navigate = useNavigate();  // useNavigate for routing
  
    const handleChange = (event, newValue) => {
      setValue(newValue);
      // Navigate to the selected page
      navigate(`/${newValue}`);
    };
  
  return (
    <BottomNavigation
      sx={{ width: 360, position: "fixed", bottom: 20 ,backgroundColor:'#F5F5FA', borderRadius: '20px', boxShadow: '0px 4px 4px rgba(0, 0, 0, 0.15)' }}
      value={value}
      onChange={handleChange}
    >
      <BottomNavigationAction
        label="Home"
        value="home"
        icon={<RestoreIcon />}
      />
      <BottomNavigationAction
        label="Favorites"
        value="favorites"
        icon={<FavoriteIcon />}
      />
      <BottomNavigationAction
        label="Nearby"
        value="nearby"
        icon={<LocationOnIcon />}
      />

      <BottomNavigationAction
        label="Folder"
        value="folder"
        icon={<FolderIcon />}
      />
    </BottomNavigation>
  );
}
