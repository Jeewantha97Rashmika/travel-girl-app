import "./App.css";
import Login from "./pages/Login";
import { Routes, Route, useLocation } from "react-router-dom";
import Signup from "./pages/Signup";
import Home from "./pages/Home";
import FixedBottomNavigation from "./layouts/commen/FixedBottomNavigation";

import Location from "./pages/Location";
import MyCircel from "./pages/MyCircel";
import Profile from "./pages/Profile";
function App() {
  const location = useLocation();
  return (
    <div className="App">
      <header className="App-header">
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/location" element={<Location />} />
          <Route path="/my_circle" element={<MyCircel />} />
          <Route path="/profile" element={<Profile />} />
          <Route
            path="/home"
            element={
            
                <Home />
           
            }
          />
        </Routes>
        {location.pathname === "/login" || location.pathname === "/signup" ? (
          <></>
        ) : (
          <FixedBottomNavigation />
        )}
      </header>

      {/* AIzaSyAGfdDJb8-nWY26M_nou5q6ASUuJFQJ5fU */}
    </div>
  );
}

export default App;
