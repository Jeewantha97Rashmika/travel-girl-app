import React, { useState } from "react";
import { Box, Button, Container, TextField } from "@mui/material";
import LoginImage from "../assets/images/cuate.png";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../firebase/services";
import { useNavigate } from "react-router-dom";

export default function LoginLayout() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const userCredential = await signInWithEmailAndPassword(
        auth,
        email,
        password
      );
      console.log("User logged in:", userCredential.user);
      navigate("/");
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
        <img src={LoginImage} alt="login" />
      </Box>
      <h1>Login</h1>

      {error && (
        <p style={{ color: "red", textAlign: "center", fontSize: "14px" }}>
          {"Check your email and password again !"}
        </p>
      )}

      <form onSubmit={handleLogin}>
        {/* Email Input */}

        <TextField
          id="outlined-email"
          label="Email"
          variant="outlined"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          sx={{
            width: "100%",
            mb: 3,
          }}
        />

        {/* Password Input */}

        <TextField
          id="outlined-password"
          label="Password"
          variant="outlined"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          sx={{
            width: "100%",
          }}
        />

        {/* Login Button */}
        <Box
          sx={{
            mt: 5,
          }}
        >
          <Button
            type="submit"
            variant="contained"
            sx={{
              width: "100%",
              backgroundColor: "#FF8852",
              boxShadow: "0px 5px 10px rgba(0, 0, 0, 0)",
            }}
          >
            Login
          </Button>

          {/* Redirect to Signup */}
          <Box
            sx={{
              textAlign: "center",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <p style={{ fontSize: "14px" }}>
              Don't have an account?{" "}
              <span
                style={{
                  color: "#FF8852",
                  cursor: "pointer",
                }}
                onClick={() => navigate("/signup")}
              >
                Sign Up
              </span>
            </p>
          </Box>
        </Box>
      </form>
    </Container>
  );
}
