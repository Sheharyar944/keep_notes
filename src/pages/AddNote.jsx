import React from "react";
import { Box, IconButton } from "@mui/material";
import { useNavigate } from "react-router";
import { useState } from "react";
import NotepadPage from "../components/NotepadPage";
import axios from "axios";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import Tooltip from "@mui/material/Tooltip";

const AddNote = () => {
  const API_URL = import.meta.env.VITE_API_URL;
  let navigate = useNavigate();
  const [note, setNote] = useState("");
  const [title, setTitle] = useState("");

  const saveNote = async () => {
    const token = localStorage.getItem("access_token");
    if (!token) {
      console.error("No access token found");
      return;
    }
    if (!note && !title) {
      return;
    }
    try {
      const response = await axios.post(
        `${API_URL}/notes/`,
        {
          title: title,
          content: note,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );
      console.log("Note saved successfully:", response.data);
      navigate("/");
    } catch (error) {
      console.error(
        "Error saving note:",
        error.response ? error.response.data : error.message
      );
    }
  };

  return (
    <Box sx={{ width: "100vw", marginTop: "5vh" }}>
      <Tooltip title="Go back" placement="top">
        <IconButton
          sx={{ marginLeft: "71vw" }}
          onClick={() => {
            saveNote();
          }}
        >
          <ArrowBackIcon />
        </IconButton>
      </Tooltip>
      <NotepadPage setTitle={setTitle} setNote={setNote} />
    </Box>
  );
};

export default AddNote;
