import React, { useState, useContext } from "react";
import { TextField, Button, Typography, Box, Paper, Link } from "@mui/material";
import { AuthContext } from "../components/AuthContext";
import axios from "axios";

const SignUp = () => {
  const { getDetails, getUser } = useContext(AuthContext);
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState({});

  const registerUser = async () => {
    try {
      const response = await axios.post("http://127.0.0.1:8000/register/", {
        username: username,
        email: email,
        password: password,
      });
      console.log("response of signup", response);
      alert("Registration successful! 🎉");
      localStorage.setItem("access_token", response.data.access);
      localStorage.setItem("refresh_token", response.data.refresh);
      localStorage.setItem("username", response.data.username);
      localStorage.setItem("id", response.data.id);
      localStorage.setItem("email", response.data.email);
      getUser(response.data.access, response.data.refresh);
      getDetails(response.data.username, response.data.email, response.data.id);
    } catch (error) {
      if (error.response) {
        setErrors(error.response.data);
      } else {
        setErrors({ general: "Network error! Please try again later." });
      }

      console.log("failed to register user", error);
    }
  };

  const handleSignUp = (e) => {
    e.preventDefault();
    registerUser();
  };

  return (
    <Box
      //   border={1}
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "100vh",
        width: "100vw",
        backgroundColor: "#f5f5f5",
      }}
    >
      <Paper elevation={3} sx={{ p: 4, width: "30vw" }}>
        <Typography variant="h4" component="h1" align="center" gutterBottom>
          Sign Up
        </Typography>
        <Box
          component="form"
          onSubmit={handleSignUp}
          sx={{
            display: "flex",
            flexDirection: "column",
            gap: 2,
          }}
        >
          <TextField
            label="Username"
            variant="outlined"
            fullWidth
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            error={!!errors.username}
            helperText={errors.username?.[0] || ""}
          />
          <TextField
            label="email"
            type="email"
            variant="outlined"
            fullWidth
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            error={!!errors.email}
            helperText={errors.email?.[0] || ""}
          />
          <TextField
            label="Password"
            type="password"
            variant="outlined"
            fullWidth
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            error={!!errors.password}
            helperText={errors.password?.[0] || ""}
          />
          <Button
            type="submit"
            variant="contained"
            color="primary"
            fullWidth
            sx={{ mt: 2 }}
          >
            Sign Up
          </Button>
        </Box>
        <Typography variant="body2" align="center" sx={{ mt: 2 }}>
          Already signed up?{" "}
          <Link href="/login" underline="hover">
            Log In
          </Link>
        </Typography>
      </Paper>
    </Box>
  );
};

export default SignUp;
