import React, { useState } from "react";
import {
  TextField,
  Button,
  Typography,
  Box,
  Paper,
  Link,
  CircularProgress,
} from "@mui/material";
import useLogin from "../hooks/useLogin";

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const { loginUser, errors, loading } = useLogin();

  const handleLogin = (e) => {
    e.preventDefault();
    loginUser(username, password);
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
          Login
        </Typography>
        <Box
          component="form"
          onSubmit={handleLogin}
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
            error={!!errors.username || !!errors.detail}
            helperText={errors.username?.[0] || ""}
          />
          <TextField
            label="Password"
            type="password"
            variant="outlined"
            fullWidth
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            error={!!errors.password || !!errors.detail}
            helperText={errors.password?.[0] || errors.detail || ""}
          />
          <Button
            type="submit"
            variant="contained"
            color="primary"
            fullWidth
            sx={{ mt: 2 }}
          >
            {loading ? (
              <CircularProgress size={24} sx={{ color: "white" }} />
            ) : (
              "Login"
            )}
          </Button>
        </Box>
        <Typography variant="body2" align="center" sx={{ mt: 2 }}>
          No account?{" "}
          <Link href="/signup" underline="hover">
            Sign Up
          </Link>
        </Typography>
      </Paper>
    </Box>
  );
};

export default Login;
