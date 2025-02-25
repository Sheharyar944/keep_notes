import React from "react";
import { Box, IconButton } from "@mui/material";
import { useNavigate, useLocation } from "react-router";
import { useState } from "react";
import NotepadPage from "../components/NotepadPage";
import axios from "axios";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import DeleteIcon from "@mui/icons-material/Delete";
import Tooltip from "@mui/material/Tooltip";

const Editor = () => {
  const API_URL = import.meta.env.VITE_API_URL;
  const location = useLocation();
  const noteId = location.state?.note?.id;
  const noteTitle = location.state?.note?.title;
  const noteContent = location.state?.note?.content;
  let navigate = useNavigate();
  const [note, setNote] = useState(noteContent);
  const [title, setTitle] = useState(noteTitle);

  const saveNote = async () => {
    const token = localStorage.getItem("access_token");

    const response = await axios.patch(
      `${API_URL}/notes/${noteId}/`,
      {
        title: title,
        content: note,
      },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
  };

  const deleteNote = async () => {
    const token = localStorage.getItem("access_token");
    const response = await axios.delete(
      `http://127.0.0.1:8000/notes/${noteId}/`,

      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    if (response) {
      navigate("/");
    }
  };

  return (
    <Box
      // border={1}
      sx={{ width: "100vw", marginTop: "5vh" }}
    >
      <Box
        //   border={1}
        sx={{ display: "flex" }}
      >
        <Tooltip title="Go back" placement="top">
          <IconButton
            sx={{ marginLeft: "68vw" }}
            onClick={() => {
              saveNote();
              navigate("/");
            }}
          >
            <ArrowBackIcon />
          </IconButton>
        </Tooltip>
        <Tooltip title="Delete" placement="top">
          <IconButton
            onClick={() => {
              deleteNote();
              // navigate("/");
            }}
          >
            <DeleteIcon />
          </IconButton>
        </Tooltip>
      </Box>
      <NotepadPage setTitle={setTitle} setNote={setNote} />
    </Box>
  );
};

export default Editor;
