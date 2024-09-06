import React from "react";
import { Box, Button, Container } from "@mui/material";
import LoginImage from "../assets/images/cuate.png";
import TextField from "@mui/material/TextField";
export default function LoginLayout() {
  return (
    <Container>
      <Box>
        <img src={LoginImage} alt="login" />
      </Box>
      <h1>Login</h1>

      <label
        style={{
          textAlign: "left",
          display: "flex",
        }}
      >
        Email
      </label>
      <TextField
        id="outlined-basic"
        label="Outlined"
        variant="outlined"
        sx={{
          width: "100%",
          mb: 3,
        }}
      />
      <label
        style={{
          textAlign: "left",
          display: "flex",
        }}
      >
        Password
      </label>
      <TextField
        id="outlined-basic"
        label="Outlined"
        variant="outlined"
        sx={{
          width: "100%",
        }}
      />
      <Box
        sx={{
          mt: 5,
        }}
      >
        <Button
          variant="contained"
          sx={{
            width: "100%",
            backgroundColor: "#FF8852",
            boxShadow: "0px 5px 10px rgba(0, 0, 0, 0)",
          }}
        >
          Login
        </Button>
        <p>
          Don't have an account? <a href="/signup">Sign Up</a>
        </p>
      </Box>
    </Container>
  );
}
