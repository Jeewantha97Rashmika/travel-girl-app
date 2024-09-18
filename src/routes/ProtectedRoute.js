import React, { useEffect, useState } from "react";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "../firebase/services";
import { Route, Navigate } from "react-router-dom";

const ProtectedRoute = ({ children }) => {
  const [user, setUser] = useState(null);
console.log(user)
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setUser(user);
    });
    return () => unsubscribe();
  }, []);

  if (user === null) {
    return <Navigate to="/login" />;
  }

  return children;
};

 export default ProtectedRoute;