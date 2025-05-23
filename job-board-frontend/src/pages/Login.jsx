import React, { useState } from "react";
import { Container, TextField, Button, Typography, Snackbar, Alert } from "@mui/material";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [snackbar, setSnackbar] = useState({ open: false, message: "", severity: "info" });

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch("http://localhost:5000/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();

      if (response.ok) {
        setSnackbar({ open: true, message: "✅ Login Successful!", severity: "success" });
        localStorage.setItem("token", data.token); // Store token
        setTimeout(() => {
          window.location.href = "/dashboard"; // Redirect to Dashboard
        }, 1500);
      } else {
        setSnackbar({ open: true, message: data.message || "Login failed. Check credentials.", severity: "error" });
      }
    } catch (error) {
      console.error("❌ Error during login:", error);
      setSnackbar({ open: true, message: "Something went wrong. Please try again.", severity: "error" });
    }
  };

  return (
    <Container sx={{ mt: 4, maxWidth: "400px" }}>
      <Typography variant="h4" gutterBottom>Login</Typography>
      <form onSubmit={handleLogin}>
        <TextField 
          fullWidth 
          label="Email" 
          variant="outlined" 
          sx={{ mb: 2 }} 
          value={email} 
          onChange={(e) => setEmail(e.target.value)} 
        />
        <TextField 
          fullWidth 
          type="password" 
          label="Password" 
          variant="outlined" 
          sx={{ mb: 2 }} 
          value={password} 
          onChange={(e) => setPassword(e.target.value)} 
        />
        <Button fullWidth variant="contained" color="primary" type="submit">
          Login
        </Button>
      </form>

      <Snackbar 
        open={snackbar.open} 
        autoHideDuration={3000} 
        onClose={() => setSnackbar({ ...snackbar, open: false })}
      >
        <Alert severity={snackbar.severity} sx={{ width: "100%" }}>
          {snackbar.message}
        </Alert>
      </Snackbar>
    </Container>
  );
};

export default Login;



