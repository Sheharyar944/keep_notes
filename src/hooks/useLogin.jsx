import React, { useContext } from "react";
import axios from "axios";
import { AuthContext } from "../components/AuthContext";

const useLogin = () => {
  const { getUser, getDetails } = useContext(AuthContext);
  const loginUser = async (username, password) => {
    try {
      const response = await axios.post("http://127.0.0.1:8000/login/", {
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
      console.log("error", error);
    }
  };

  return { loginUser };
};

export default useLogin;
