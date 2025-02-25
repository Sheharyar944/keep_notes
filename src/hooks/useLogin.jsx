import React, { useContext, useState } from "react";
import axios from "axios";
import { AuthContext } from "../components/AuthContext";

const useLogin = () => {
  const API_URL = import.meta.env.VITE_API_URL;
  const { getUser, getDetails } = useContext(AuthContext);
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({});
  const loginUser = async (username, password) => {
    setLoading(true);
    try {
      const response = await axios.post(`${API_URL}/login/`, {
        username: username,
        password: password,
      });
      console.log("respose", response);
      localStorage.setItem("access_token", response.data.access);
      localStorage.setItem("refresh_token", response.data.refresh);
      localStorage.setItem("username", response.data.user.username);
      localStorage.setItem("id", response.data.user.id);
      localStorage.setItem("email", response.data.user.email);
      getUser(response.data.access, response.data.refresh);
      getDetails(
        response.data.user.username,
        response.data.user.email,
        response.data.user.id
      );
      return response;
    } catch (error) {
      if (error.response) {
        setErrors(error.response.data);
      } else {
        setErrors({ general: "network error" });
      }
      console.log("unable to sign in", error);
    }
    setLoading(false);
  };

  return { loginUser, errors, loading };
};

export default useLogin;
