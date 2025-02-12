import React, { useContext } from "react";
import Typography from "@mui/material/Typography";
import { Outlet, useNavigate } from "react-router";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Button from "@mui/material/Button";
import { AuthContext } from "./AuthContext";

const Root = () => {
  const { user, logout } = useContext(AuthContext);
  let navigate = useNavigate();
  return (
    <Box
      // border={1}
      sx={{ minHeight: "100vh" }}
    >
      <AppBar position="static">
        <Toolbar style={{ height: "10vh" }}>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            Keep Notes
          </Typography>
          {!user ? (
            <Button onClick={() => navigate("/login")} color="inherit">
              Login
            </Button>
          ) : (
            <Button
              onClick={() => {
                logout();
                navigate("/login");
              }}
              color="inherit"
            >
              Logout
            </Button>
          )}
        </Toolbar>
      </AppBar>
      <Outlet />
    </Box>
  );
};

export default Root;
