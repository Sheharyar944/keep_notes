import React, { useState, createContext, useEffect } from "react";
import axios from "axios";
export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [loading, setLoading] = useState(false);
  const access = localStorage.getItem("access_token");
  const refresh = localStorage.getItem("refresh_token");
  const [user, setUser] = useState(access ? { access, refresh } : null);
  const [userDetails, setUserDetails] = useState({
    username: localStorage.getItem("username") || "",
    email: localStorage.getItem("email") || "",
    id: localStorage.getItem("id") || null,
  });

  const getDetails = (username, email, id) => {
    setUserDetails({
      username,
      email,
      id,
    });
  };

  const getUser = (access, refresh) => {
    setUser({
      access,
      refresh,
    });
  };

  const logout = () => {
    setUser(null);
    setUserDetails(null);
    localStorage.removeItem("access_token");
    localStorage.removeItem("refresh_token");
    localStorage.removeItem("username");
    localStorage.removeItem("id");
    localStorage.removeItem("email");
  };

  const updateToken = async () => {
    try {
      const token = localStorage.getItem("refresh_token");
      const response = await axios.post(
        "http://127.0.0.1:8000/api/token/refresh/",
        {
          refresh: token,
        }
      );
      console.log("token refresh successful", response);
      if (response.status === 200) {
        localStorage.setItem("access_token", response.data.access);
        localStorage.setItem("refresh_token", response.data.refresh);
      } else {
        logout();
      }
    } catch (err) {
      console.log("error updation token", err);
    }
  };

  useEffect(() => {
    if (user) {
      updateToken();
    }
    let intervalId = setInterval(() => {
      if (user) {
        updateToken();
      }
    }, 4000 * 60);
    return () => clearInterval(intervalId);
  }, []);

  return (
    <AuthContext.Provider
      value={{ user, userDetails, getUser, getDetails, logout }}
    >
      {children}
    </AuthContext.Provider>
  );
};
