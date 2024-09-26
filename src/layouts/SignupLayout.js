import React, { useState } from "react";
import { Box, Button, Container, TextField, Typography } from "@mui/material";
import LoginImage from "../assets/images/cuate.png";
import { createUserWithEmailAndPassword } from "firebase/auth"; // Firebase methods
import { auth, db } from "../firebase/services"; // Import Firestore (db)
import { useNavigate } from "react-router-dom";
import { doc, setDoc } from "firebase/firestore"; // Firestore methods

export default function SignupLayout() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [name, setName] = useState("");
  const [age, setAge] = useState("");
  const [error, setError] = useState("");

  const navigate = useNavigate(); // Initialize useNavigate

  const handleSignUp = async (e) => {
    e.preventDefault();

    // Check if passwords match
    if (password !== confirmPassword) {
      setError("Passwords do not match");
      return;
    }

    try {
      // Create user with email and password
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );
      const user = userCredential.user;

      // Save additional user data to Firestore
      await setDoc(doc(db, "users", user.uid), {
        name,
        age,
        email,
        createdAt: new Date().toISOString(),
      });

      console.log("User signed up and additional data saved:", user);

      // Navigate to login after signup
      navigate("/login");
    } catch (error) {
      setError(error.message);
    }
  };

  return (
    <Container>
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          mt: 10,
        }}
      >
        <img src={LoginImage} alt="login" width={"50%"} />
      </Box>
      <h1>Sign Up</h1>

      {error && <p style={{ color: "red" }}>{error}</p>}

      <form onSubmit={handleSignUp}>
        <TextField
          label="Name"
          variant="outlined"
          value={name}
          onChange={(e) => setName(e.target.value)}
          sx={{
            width: "100%",
            mb: 2,
          }}
        />

        <TextField
          label="Age"
          variant="outlined"
          value={age}
          onChange={(e) => setAge(e.target.value)}
          sx={{
            width: "100%",
            mb: 2,
          }}
        />

        <TextField
          label="Email"
          variant="outlined"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          sx={{
            width: "100%",
            mb: 2,
          }}
        />

        <TextField
          label="Password"
          variant="outlined"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          sx={{
            width: "100%",
            mb: 2,
          }}
        />

        <TextField
          label="Confirm Password"
          variant="outlined"
          type="password"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          sx={{
            width: "100%",
            mb: 2,
          }}
        />

        <Box sx={{ mt: 5 }}>
          <Button
            type="submit"
            variant="contained"
            sx={{
              width: "100%",
              backgroundColor: "#FF8852",
              boxShadow: "0px 5px 10px rgba(0, 0, 0, 0)",
            }}
          >
            Sign up
          </Button>
        </Box>
      </form>
      <Box
        sx={{
          textAlign: "center",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          mt: 2,
        }}
      >
        <Typography>
          I already have an account?{" "}
          <span
            style={{
              color: "#FF8852",
              cursor: "pointer",
            }}
            onClick={() => navigate("/login")}
          >
            Login
          </span>
        </Typography>
      </Box>
    </Container>
  );
}
