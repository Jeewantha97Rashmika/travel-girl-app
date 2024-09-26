import React, { useEffect, useState } from "react";
import "./App.css";
import Login from "./pages/Login";
import { Routes, Route, useLocation, Navigate } from "react-router-dom";
import Signup from "./pages/Signup";
import Home from "./pages/Home";
import FixedBottomNavigation from "./layouts/commen/FixedBottomNavigation";
import Location from "./pages/Location";
import MyCircel from "./pages/MyCircel";
import Profile from "./pages/Profile";
import { auth } from "./firebase/services"; // Firebase auth instance

function App() {
  const [user, setUser] = useState(null); // To track authentication status
  const location = useLocation();

  // Set up Firebase auth state listener
  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((authUser) => {
      if (authUser) {
        setUser(authUser); // User is logged in
      } else {
        setUser(null); // User is not logged in
      }
    });

    // Cleanup subscription
    return () => unsubscribe();
  }, []);

  return (
    <div className="App">
      <header className="App-header">
        <Routes>
          {/* Public routes */}
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />

          {/* Protected routes */}
          <Route
            path="/home"
            element={user ? <Home /> : <Navigate to="/login" />}
          />
          <Route
            path="/location"
            element={user ? <Location /> : <Navigate to="/login" />}
          />
          <Route
            path="/my_circle"
            element={user ? <MyCircel /> : <Navigate to="/login" />}
          />
          <Route
            path="/profile"
            element={user ? <Profile user={user} /> : <Navigate to="/login" />}
          />
        </Routes>

        {/* Conditionally render bottom navigation if user is authenticated */}
        {location.pathname === "/login" || location.pathname === "/signup" ? (
          <></>
        ) : (
          <FixedBottomNavigation />
        )}
      </header>
    </div>
  );
}

export default App;
